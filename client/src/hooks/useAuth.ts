/**
 * Custom hook for authentication using Zustand
 * Note: Token is stored in httpOnly cookie, not in client state
 * This hook is for client-side UI state only
 */

import { useAuthStore } from '../store/authStore';

/**
 * Main auth hook that provides auth state and actions
 * For mutations, use Server Actions instead
 */
export function useAuth() {
  const { user, isAuthenticated, clearAuth } = useAuthStore();

  return {
    user,
    isAuthenticated,
    // Note: Login/Register/Logout should use Server Actions
    // These are kept for backward compatibility but should be migrated
    logout: () => {
      clearAuth();
      // Cookie will be cleared by logout Server Action
    },
  };
}
