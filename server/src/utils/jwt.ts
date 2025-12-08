/**
 * JWT utility functions
 */

import jwt, { SignOptions } from 'jsonwebtoken';
import type { JwtPayload } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate JWT token
 */
export function generateToken(payload: JwtPayload): string {
  const tokenPayload = {
    userId: payload.userId,
    email: payload.email,
    role: String(payload.role), // Convert enum to string for JWT
  };
  
  return jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Generate password reset token
 */
export function generateResetToken(): string {
  return jwt.sign({ type: 'reset' }, JWT_SECRET, {
    expiresIn: '1h', // Reset token expires in 1 hour
  });
}

/**
 * Verify password reset token
 */
export function verifyResetToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { type?: string };
    return decoded.type === 'reset';
  } catch (error) {
    return false;
  }
}

