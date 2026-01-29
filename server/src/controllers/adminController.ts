/**
 * Admin controller - Administrative user management
 */

import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import { AppError } from '../middleware/errorHandler';
import { UserRole, UserStatus, ProfessionalTitle, LawyerProfileStatus } from '../generated/prisma';
import { comparePassword, hashPassword } from '../utils/password';

/**
 * Get all lawyers
 */
export async function getAllLawyers(req: Request, res: Response, next: NextFunction) {
    try {
        const lawyers = await prisma.user.findMany({
            where: {
                role: UserRole.LAWYER,
                lawyerProfile: {
                    status: { not: LawyerProfileStatus.INCOMPLETE }
                }
            },
            include: { lawyerProfile: true },
            orderBy: { createdAt: 'desc' },
        });

        res.json({
            success: true,
            data: lawyers.map(({ password, ...user }) => user),
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get all clients
 */
export async function getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
        const clients = await prisma.user.findMany({
            where: { role: UserRole.CLIENT },
            orderBy: { createdAt: 'desc' },
        });

        res.json({
            success: true,
            data: clients.map(({ password, ...user }) => user),
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get user by ID (Lawyer or Client)
 */
export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            include: { lawyerProfile: true },
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const { password, ...userWithoutPassword } = user;

        res.json({
            success: true,
            data: userWithoutPassword,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Update user (Admin version)
 */
export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const {
            firstName, lastName, email, role, status, isActive,
            // Lawyer profile fields
            lawyerProfile
        } = req.body;

        // Check if user exists before attempting update
        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            throw new AppError('User not found', 404);
        }

        const updatedUser = await prisma.$transaction(async (tx) => {
            // Update User base data
            const user = await tx.user.update({
                where: { id },
                data: {
                    firstName,
                    lastName,
                    email: email?.toLowerCase(),
                    role,
                    status,
                    isActive,
                },
            });

            // Update LawyerProfile if applicable
            if (lawyerProfile && (role === UserRole.LAWYER || user.role === UserRole.LAWYER)) {
                await tx.lawyerProfile.upsert({
                    where: { userId: id },
                    create: {
                        user: { connect: { id } },
                        fullLegalName: lawyerProfile.fullLegalName || `${user.firstName} ${user.lastName}`,
                        title: lawyerProfile.title || ProfessionalTitle.BARRISTER,
                        registrationNumber: lawyerProfile.registrationNumber || 'PENDING',
                        firmName: lawyerProfile.firmName,
                        address: lawyerProfile.address || 'PENDING',
                        phoneNumber: lawyerProfile.phoneNumber || 'PENDING',
                        websiteUrl: lawyerProfile.websiteUrl,
                        practiceAreas: lawyerProfile.practiceAreas || [],
                        experienceYears: lawyerProfile.experienceYears || 0,
                        languages: lawyerProfile.languages || [],
                        biography: lawyerProfile.biography || '',
                    },
                    update: {
                        fullLegalName: lawyerProfile.fullLegalName,
                        title: lawyerProfile.title,
                        registrationNumber: lawyerProfile.registrationNumber,
                        firmName: lawyerProfile.firmName,
                        address: lawyerProfile.address,
                        phoneNumber: lawyerProfile.phoneNumber,
                        websiteUrl: lawyerProfile.websiteUrl,
                        practiceAreas: lawyerProfile.practiceAreas,
                        experienceYears: lawyerProfile.experienceYears,
                        languages: lawyerProfile.languages,
                        biography: lawyerProfile.biography,
                    }
                });
            }

            return tx.user.findUnique({
                where: { id },
                include: { lawyerProfile: true }
            });
        });

        const { password: _, ...userWithoutPassword } = updatedUser!;

        res.json({
            success: true,
            message: 'User updated successfully',
            data: userWithoutPassword,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Delete user
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Delete user (Prisma cascade will handle LawyerProfile)
        await prisma.user.delete({
            where: { id },
        });

        res.json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Change Admin Password
 */
export async function changeAdminPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const { currentPassword, newPassword } = req.body;
        const adminId = req.user?.userId;

        if (!adminId) {
            throw new AppError('Not authenticated', 401);
        }

        // Find admin user
        const admin = await prisma.user.findUnique({
            where: { id: adminId },
        });

        if (!admin) {
            throw new AppError('Admin user not found', 404);
        }

        // Verify it's actually an admin
        if (admin.role !== UserRole.ADMIN) {
            throw new AppError('Forbidden: Only admins can use this endpoint', 403);
        }

        // Verify current password
        if (!admin.password) {
            throw new AppError('Account has no password (Google Login). Please set a password first.', 400);
        }

        const isPasswordValid = await comparePassword(currentPassword, admin.password);
        if (!isPasswordValid) {
            throw new AppError('Incorrect current password', 400);
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword);

        // Update password
        await prisma.user.update({
            where: { id: adminId },
            data: { password: hashedPassword },
        });

        res.json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get all lawyers pending review
 */
export async function getPendingLawyers(req: Request, res: Response, next: NextFunction) {
    try {
        const lawyers = await prisma.lawyerProfile.findMany({
            where: { status: LawyerProfileStatus.PENDING_REVIEW },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                    }
                }
            },
            orderBy: { submittedAt: 'desc' },
        });

        res.json({
            success: true,
            data: lawyers,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Approve lawyer profile
 */
export async function approveLawyer(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: userId } = req.params;
        const adminId = req.user?.userId;

        console.log(`Approving lawyer. UserID: ${userId}, AdminID: ${adminId}`);

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                status: LawyerProfileStatus.APPROVED,
                reviewedAt: new Date(),
                reviewedById: adminId,
                rejectionReason: null
            },
            include: { user: true }
        });

        // Update User status to APPROVED
        await prisma.user.update({
            where: { id: userId },
            data: { status: UserStatus.APPROVED }
        });

        res.json({
            success: true,
            message: 'Lawyer profile approved successfully',
            data: profile,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Reject lawyer profile
 */
export async function rejectLawyer(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: userId } = req.params;
        const { reason } = req.body;
        const adminId = req.user?.userId;

        console.log(`Rejecting lawyer. UserID: ${userId}, AdminID: ${adminId}, Reason: ${reason}`);

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                status: LawyerProfileStatus.REJECTED,
                reviewedAt: new Date(),
                reviewedById: adminId,
                rejectionReason: reason || 'Profile did not meet requirements'
            },
            include: { user: true }
        });

        // Update User status to REJECTED
        await prisma.user.update({
            where: { id: userId },
            data: { status: UserStatus.REJECTED }
        });

        res.json({
            success: true,
            message: 'Lawyer profile rejected successfully',
            data: profile,
        });
    } catch (error) {
        next(error);
    }
}
