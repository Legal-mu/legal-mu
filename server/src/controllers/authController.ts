/**
 * Authentication controller
 */

import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import { UserRole, UserStatus, ProfessionalTitle, LawyerProfileStatus } from '../generated/prisma';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken, generateResetToken, verifyResetToken } from '../utils/jwt';
import { AppError } from '../middleware/errorHandler';
import type {
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../types/auth';

/**
 * Register new user
 */
export async function register(
  req: Request<{}, {}, RegisterRequest>,
  res: Response,
  next: NextFunction
) {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userRole = role || UserRole.CLIENT;
    const userStatus = userRole === UserRole.LAWYER ? UserStatus.PENDING : UserStatus.APPROVED;

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: userRole,
        status: userStatus,
        // Add lawyer profile if registering as a lawyer
        ...(userRole === UserRole.LAWYER && {
          lawyerProfile: {
            create: {
              status: LawyerProfileStatus.INCOMPLETE,
              completionPercentage: 0,
              completedSteps: []
            }
          }
        })
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        lawyerProfile: {
          select: {
            status: true
          }
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set httpOnly cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user_id: user.id,
        token,
        profile_status: user.lawyerProfile?.status || null
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Login user
 */
export async function login(
  req: Request<{}, {}, LoginRequest>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    // Verify password
    if (!user.password) {
      throw new AppError('This account was created with Google. Please sign in with Google.', 400);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set httpOnly cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          status: user.status as UserStatus,
          dateOfBirth: user.dateOfBirth,
        },
        token, // Return token for Server Actions to set cookie
        redirectHint: user.role === UserRole.LAWYER ? (user.status === UserStatus.APPROVED ? '/pricing-plan' : 'Waiting for Approval') : '/dashboard',
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Forgot password - Send reset token
 */
export async function forgotPassword(
  req: Request<{}, {}, ForgotPasswordRequest>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Don't reveal if user exists (security best practice)
    if (!user) {
      return res.json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent',
      });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetTokenExp = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExp,
      },
    });

    // TODO: Send email with reset token
    // For now, we'll return the token in development
    // In production, send email instead
    if (process.env.NODE_ENV === 'development') {
      console.log('Reset token (dev only):', resetToken);
    }

    res.json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent',
      // Remove this in production
      ...(process.env.NODE_ENV === 'development' && { resetToken }),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Reset password using reset token
 */
export async function resetPassword(
  req: Request<{}, {}, ResetPasswordRequest>,
  res: Response,
  next: NextFunction
) {
  try {
    const { token, newPassword } = req.body;

    // Verify reset token
    if (!verifyResetToken(token)) {
      throw new AppError('Invalid or expired reset token', 400);
    }

    // Find user by reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExp: {
          gte: new Date(), // Token not expired
        },
      },
    });

    if (!user) {
      throw new AppError('Invalid or expired reset token', 400);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    res.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Logout user - Clear auth cookie
 */
export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Clear httpOnly cookie
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
}
