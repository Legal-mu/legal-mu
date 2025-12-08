'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, getAuthToken, getAuthUser, setAuthData, removeAuthToken } from '../lib/api';
import { isTokenExpired } from '../utils/jwt';
import type {
  AuthContextType,
  User,
  RegisterRequest,
  AuthResponse,
} from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Restore user session from localStorage on mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = getAuthToken();
      const storedUser = getAuthUser();
      
      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(storedToken)) {
        removeAuthToken();
        setIsLoading(false);
        return;
      }

      // Restore user and token from localStorage
      setUser(storedUser as User);
      setToken(storedToken);

      // Verify token is still valid by calling a protected endpoint
      try {
        await api.getProtectedData();
      } catch (error) {
        // Token is invalid, clear it
        removeAuthToken();
        setUser(null);
        setToken(null);
      }

      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login({ email, password });
      if (response.success && response.data) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        setAuthData(token, user); // Store both token and user data
        router.push('/dashboard');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await api.register(data);
      if (response.success && response.data) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        setAuthData(token, user); // Store both token and user data
        router.push('/dashboard');
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeAuthToken();
    router.push('/login');
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await api.forgotPassword({ email });
      if (!response.success) {
        throw new Error(response.message || 'Failed to send reset email');
      }
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const response = await api.resetPassword({ token, newPassword });
      if (!response.success) {
        throw new Error(response.message || 'Failed to reset password');
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

