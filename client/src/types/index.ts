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
}

// Auth types
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string;
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
