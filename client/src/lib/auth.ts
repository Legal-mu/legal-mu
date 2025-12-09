/**
 * Server-side authentication utilities
 * Used in Server Components and Server Actions
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

/**
 * Get current user from server-side (Server Component)
 */
export async function getServerUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return null;
    }

    // Forward cookies to backend API
    // In Server Components, we need to manually forward cookies
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${API_URL}/api/protected`, {
      headers: {
        Cookie: cookieHeader, // Forward cookies from the request
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user || null;
  } catch (error) {
    console.error('Error getting server user:', error);
    return null;
  }
}

/**
 * Require authentication in Server Components
 * Redirects to login if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getServerUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

/**
 * Require specific role in Server Components
 */
export async function requireRole(role: 'ADMIN' | 'VISITOR'): Promise<User> {
  const user = await requireAuth();

  if (user.role !== role) {
    redirect('/dashboard'); // Redirect if role doesn't match
  }

  return user;
}

