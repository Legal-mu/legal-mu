/**
 * Shared TypeScript types for the application
 */

// API Response types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
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

