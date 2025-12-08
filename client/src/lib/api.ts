/**
 * API utility functions for communicating with the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

/**
 * Generic API fetch function with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
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
    return fetchAPI<{
      status: string;
      database: string;
      timestamp: string;
    }>('/health');
  },

  /**
   * Get server status
   */
  async getStatus() {
    return fetchAPI<{
      message: string;
      status: string;
    }>('/');
  },
};

export default api;

