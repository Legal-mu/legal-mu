/**
 * Authentication related types
 */

// Import UserRole from Prisma generated types
import { UserRole } from '../generated/prisma/enums';
export { UserRole };

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  areaOfLaw?: string;
  category?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    dateOfBirth?: Date | null;
    areaOfLaw?: string | null;
    category?: string | null;
  };
  token: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

