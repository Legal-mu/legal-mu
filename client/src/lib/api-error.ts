/**
 * API Error handling utilities
 * Production-ready error handling with proper types
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    // Check if it's a network error
    if (error.message.includes('fetch')) {
      return new ApiError(
        'Network error. Please check your connection and try again.',
        0
      );
    }

    // Check if it's a validation error
    if (error.message.includes('Validation')) {
      return new ApiError(error.message, 400);
    }

    return new ApiError(error.message || 'An unexpected error occurred');
  }

  return new ApiError('An unexpected error occurred');
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  const apiError = handleApiError(error);

  // Map status codes to user-friendly messages
  switch (apiError.statusCode) {
    case 401:
      return 'You are not authenticated. Please log in.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 500:
      return 'Server error. Please try again later.';
    case 0:
      return 'Network error. Please check your connection.';
    default:
      return apiError.message || 'An error occurred. Please try again.';
  }
}

