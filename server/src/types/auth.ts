/**
 * Authentication related types
 */

// Import UserRole from Prisma generated types
import { UserRole, UserStatus, LawyerProfileStatus, ProfessionalTitle } from '../generated/prisma';
export { UserRole, UserStatus, LawyerProfileStatus, ProfessionalTitle };

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
  city?: string;
  postal_code?: string;
  country?: string;
  phoneNumber?: string;
  practiceAreas?: string[];
  admissionYear?: number;
  experienceYears?: number;
  languagesSpeak?: string[];
  biography?: string;
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
    areaOfLaw?: string | null;
    category?: string | null;
  };
  token: string;
  redirectHint?: string; // Hint for where to redirect based on role/status
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

