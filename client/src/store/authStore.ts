/**
 * Zustand store for authentication state
 * Note: Token is stored in httpOnly cookie, not in localStorage
 * This store only keeps user data for client-side UI
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      setAuth: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },
      
      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      
      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
