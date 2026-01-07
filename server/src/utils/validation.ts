/**
 * Validation schemas using Zod
 */

import { z } from 'zod';

// Register validation schema
export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  dateOfBirth: z.string().optional(),
  role: z.enum(['ADMIN', 'LAWYER', 'CLIENT']).optional(),

  // Lawyer profile fields (optional in base schema, can be refined based on role)
  fullLegalName: z.string().optional(),
  professionalTitle: z.enum(['BARRISTER', 'ATTORNEY', 'NOTARY']).optional(),
  registrationNumber: z.string().optional(),
  firmName: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  mobileNumber: z.string().optional(),
  websiteUrl: z.string().optional(),
  practiceAreas: z.array(z.string()).optional(),
  experienceYears: z.number().optional(),
  jurisdictions: z.array(z.string()).optional(),
  languagesSpeak: z.array(z.string()).optional(),
  biography: z.string().max(2500).optional(), // Approx 500 words
  valueProposition: z.string().max(1000).optional(), // Approx 200 words
  awards: z.string().optional(),
});

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Reset password validation schema
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

