/**
 * API utility functions for communicating with the backend
 */

import type {
  ApiResponse,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  HealthCheckResponse,
  ServerStatusResponse,
} from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Get stored user data
 */
export function getAuthUser(): any | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Store auth token and user data
 */
export function setAuthData(token: string, user: any): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

/**
 * Remove auth token and user data
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

/**
 * Generic API fetch function with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle validation errors
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors
          .map((e: { field: string; message: string }) => e.message)
          .join(', ');
        throw new Error(errorMessages);
      }
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * API client methods
 */
export const api = {
  /**
   * Health check endpoint
   */
  async healthCheck() {
    return fetchAPI<HealthCheckResponse>('/health');
  },

  /**
   * Get server status
   */
  async getStatus() {
    return fetchAPI<ServerStatusResponse>('/');
  },

  /**
   * Register new user
   */
  async register(data: RegisterRequest) {
    return fetchAPI<ApiResponse<AuthResponse>>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Login user
   */
  async login(data: LoginRequest) {
    return fetchAPI<ApiResponse<AuthResponse>>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Forgot password
   */
  async forgotPassword(data: ForgotPasswordRequest) {
    return fetchAPI<ApiResponse>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Reset password
   */
  async resetPassword(data: ResetPasswordRequest) {
    return fetchAPI<ApiResponse>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Get protected route data (example)
   */
  async getProtectedData() {
    return fetchAPI<ApiResponse<{ message: string; user: unknown }>>(
      '/api/protected'
    );
  },
};

export default api;
