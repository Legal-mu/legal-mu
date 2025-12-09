/**
 * React Query hooks for API data fetching
 * Production-ready hooks with proper error handling and caching
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type {
  HealthCheckResponse,
  ServerStatusResponse,
  ApiResponse,
} from '../types';

/**
 * Hook for health check
 */
export function useHealthCheck() {
  return useQuery<HealthCheckResponse, Error>({
    queryKey: ['health'],
    queryFn: () => api.healthCheck(),
    staleTime: 1000 * 30, // 30 seconds (health checks should be fresh)
    retry: 2,
    refetchInterval: 1000 * 60, // Refetch every minute
  });
}

/**
 * Hook for server status
 */
export function useServerStatus() {
  return useQuery<ServerStatusResponse, Error>({
    queryKey: ['server-status'],
    queryFn: () => api.getStatus(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
}

/**
 * Hook for protected data
 */
export function useProtectedData() {
  return useQuery<ApiResponse<{ message: string; user: unknown }>, Error>({
    queryKey: ['protected'],
    queryFn: () => api.getProtectedData(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Only retry once for auth-protected routes
    enabled: true, // Can be controlled by auth state
  });
}

/**
 * Hook for invalidating queries
 */
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateHealth: () => queryClient.invalidateQueries({ queryKey: ['health'] }),
    invalidateProtected: () =>
      queryClient.invalidateQueries({ queryKey: ['protected'] }),
  };
}

