/**
 * Authentication related types
 */

// Import UserRole from Prisma generated types
import { UserRole, UserStatus } from '../generated/prisma';
export { UserRole, UserStatus };

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  role?: UserRole; // Optional, defaults to CLIENT in controller

  // Lawyer profile fields
  fullLegalName?: string;
  professionalTitle?: 'BARRISTER' | 'ATTORNEY' | 'NOTARY';
  registrationNumber?: string;
  firmName?: string;
  address?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  websiteUrl?: string;
  practiceAreas?: string[];
  experienceYears?: number;
  jurisdictions?: string[];
  languagesSpeak?: string[];
  biography?: string;
  valueProposition?: string;
  awards?: string;
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
    status: UserStatus;
    dateOfBirth?: Date | null;
  };
  token: string;
  redirectHint?: string; // Hint for where to redirect based on role/status
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

