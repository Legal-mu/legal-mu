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
  User,
} from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

/**
 * Note: Authentication is now handled via httpOnly cookies
 * No need to manually manage tokens in localStorage
 */

/**
 * Generic API fetch function with error handling
 * Cookies are automatically sent by the browser
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  // Cookies are automatically included by the browser
  // No need to manually add Authorization header for cookie-based auth

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies in requests
    });

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return {} as T; // Return empty object for non-JSON responses
    }

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
    // Re-throw if it's already an Error
    if (error instanceof Error) {
      console.error(`API request failed [${url}]:`, error.message);
      if (process.env.NODE_ENV === 'development') {
        console.error(error.stack);
      }
      throw error;
    }
    // Handle unexpected errors
    console.error('Unexpected API error:', error);
    throw new Error('An unexpected error occurred');
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
   * Logout user
   */
  async logout() {
    return fetchAPI<ApiResponse>('/api/auth/logout', {
      method: 'POST',
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

  /**
   * Get all lawyers (admin only)
   */
  async getLawyers() {
    return fetchAPI<ApiResponse<User[]>>('/api/admin/lawyers');
  },

  /**
   * Get all clients (admin only)
   */
  async getClients() {
    return fetchAPI<ApiResponse<User[]>>('/api/admin/clients');
  },

  /**
   * Update user (admin only)
   */
  async updateUser(id: string, data: Partial<User> & { lawyerProfile?: any }) {
    return fetchAPI<ApiResponse<User>>(`/api/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete user (admin only)
   */
  async deleteUser(id: string) {
    return fetchAPI<ApiResponse>(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Change admin password
   */
  async changeAdminPassword(data: { currentPassword: string; newPassword: string }) {
    return fetchAPI<ApiResponse>('/api/admin/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Approve lawyer (admin only)
   */
  async approveLawyer(id: string) {
    return fetchAPI<ApiResponse>(`/api/admin/lawyers/${id}/approve`, {
      method: 'PATCH',
    });
  },

  /**
   * Reject lawyer (admin only)
   */
  async rejectLawyer(id: string, reason?: string) {
    return fetchAPI<ApiResponse>(`/api/admin/lawyers/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  },

  /**
   * Lawyer Profile Endpoints
   */
  async getLawyerProfile() {
    return fetchAPI<ApiResponse<any>>('/api/lawyers/profile');
  },

  async getLawyerProfileStatus() {
    return fetchAPI<ApiResponse<{
      status: string;
      completionPercentage: number;
      completedSteps: string[];
      missingFields: string[];
    }>>('/api/lawyers/profile/status');
  },

  async updateProfessionalIdentity(data: {
    fullLegalName: string;
    title: string;
    registrationNumber: string;
    firmName: string;
    legalCategory: string;
  }) {
    return fetchAPI<ApiResponse>('/api/lawyers/profile/professional-identity', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async updateContactInformation(data: {
    address: string;
    city: string;
    postal_code: string;
    country: string;
    phoneNumber: string;
  }) {
    return fetchAPI<ApiResponse>('/api/lawyers/profile/contact-information', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async updatePracticeDetails(formData: FormData) {
    // Now uses FormData to support CV upload
    const url = `${API_URL}/api/lawyers/profile/practice-details`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update practice details');
    }

    return response.json();
  },

  async updateBiography(formData: FormData) {
    // Biography update uses multipart/form-data for headshot upload
    const url = `${API_URL}/api/lawyers/profile/biography`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update biography');
    }

    return response.json();
  },

  async updateSocialMedia(data: {
    websiteUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    youtubeUrl?: string;
    showGoogleReviews: boolean;
    googleBusinessProfileUrl?: string;
  }) {
    return fetchAPI<ApiResponse>('/api/lawyers/profile/social-media', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async updateCaseStories(data: {
    clientTestimonials: { text: string; initials: string }[];
    featuredSuccessStories: string;
  }) {
    return fetchAPI<ApiResponse>('/api/lawyers/profile/case-stories', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async updateVerificationTools(formData: FormData) {
    const url = `${API_URL}/api/lawyers/profile/verification-tools`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update verification tools');
    }

    return response.json();
  },

  async submitProfileForReview() {
    return fetchAPI<ApiResponse>('/api/lawyers/profile/submit-for-review', {
      method: 'POST',
    });
  },
};

export default api;
