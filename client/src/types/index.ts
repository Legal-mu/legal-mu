/**
 * Shared TypeScript types for the application
 */

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

// Health check response
export interface HealthCheckResponse {
  status: string;
  database: string;
  timestamp: string;
}

// Server status response
export interface ServerStatusResponse {
  message: string;
  status: string;
}

// User types
export enum UserRole {
  ADMIN = 'ADMIN',
  LAWYER = 'LAWYER',
  CLIENT = 'CLIENT',
}

export enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum LegalCategory {
  SENIOR_COUNSEL_SILK = 'SENIOR_COUNSEL_SILK',
  LEADING_LAW_FIRM = 'LEADING_LAW_FIRM',
  INTERNATIONAL_CHAMBERS = 'INTERNATIONAL_CHAMBERS',
  NOTARIAL_STUDY = 'NOTARIAL_STUDY',
}

export interface WorkExperience {
  role: string;
  firm: string;
  years: string;
}

export interface ClientTestimonial {
  text: string;
  initials: string;
}

export interface LawyerProfile {
  id: string;
  userId: string;
  fullLegalName?: string;
  title?: string;
  registrationNumber?: string;
  firmName?: string;
  legalCategory?: LegalCategory;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  phoneNumber?: string;
  practiceAreas: string[];
  admissionYear?: number;
  experienceYears?: number;
  languages: string[];
  workExperience?: WorkExperience[];
  cvUrl?: string;
  biography?: string;
  extendedBiography?: string;
  headshotUrl?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  showGoogleReviews: boolean;
  googleBusinessProfileUrl?: string;
  clientTestimonials?: ClientTestimonial[];
  featuredSuccessStories?: string;
  verifiedBadges: string[];
  clientDataUploadEnabled: boolean;
  clientUploadNotificationEmail?: string;
  authorizedFileTypes: string[];
  status: string;
  completionPercentage: number;
  completedSteps?: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  dateOfBirth?: Date | null;
  isActive?: boolean;
  createdAt?: string;
  lawyerProfile?: LawyerProfile;
}

// Auth types
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
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
  user: User;
  token: string;
  profile_status?: string | null;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}
