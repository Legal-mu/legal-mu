/**
 * Server Actions for authentication
 * These run on the server and can set cookies directly
 */

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { RegisterRequest, LoginRequest } from '../../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

interface ActionResult<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * Server Action: Login
 */
export async function loginAction(
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'Login failed',
        errors: data.errors,
      };
    }

    // Set httpOnly cookie using Next.js cookies()
    // Token is returned in response body for Server Actions
    if (data.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set('auth_token', data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        path: '/',
      });
    }

    // Return success - redirect will be handled on client side
    return {
      success: true,
      message: 'Login successful',
      data: data.data?.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed',
    };
  }
}

/**
 * Server Action: Register
 */
export async function registerAction(
  formData: FormData
): Promise<ActionResult> {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const dateOfBirth = formData.get('dateOfBirth') as string | null;
  const areaOfLaw = formData.get('areaOfLaw') as string;
  const category = formData.get('category') as string;

  const payload = {
    firstName,
    lastName,
    email,
    password,
    ...(dateOfBirth && { dateOfBirth }),
    ...(areaOfLaw && { areaOfLaw }),
    ...(category && { category }),
  };

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'Registration failed',
        errors: data.errors,
      };
    }

    // Set httpOnly cookie using Next.js cookies()
    // Token is returned in response body for Server Actions
    if (data.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set('auth_token', data.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        path: '/',
      });
    }

    // Return success - redirect will be handled on client side
    return {
      success: true,
      message: 'Registration successful',
      data: data.data?.user,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed',
    };
  }
}

/**
 * Server Action: Logout
 */
export async function logoutAction(): Promise<void> {
  try {
    const cookieStore = await cookies();

    // 1. Clear cookie on client side (Server Action side)
    cookieStore.delete('auth_token');

    // 2. Call backend to clear cookie (Redundant but for completeness)
    try {
      fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
      }).catch(() => { }); // Non-blocking
    } catch (err) {
      // Ignore
    }
  } catch (error) {
    console.error('Logout error:', error);
  }

  // 3. Redirect to login
  // redirect() must be called outside of try/catch or it will be caught
  // because it works by throwing an error.
  redirect('/login');
}

/**
 * Server Action: Forgot Password
 */
export async function forgotPasswordAction(
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get('email') as string;

  try {
    const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'Failed to send reset email',
      };
    }

    return {
      success: true,
      message: data.message || 'Password reset email sent',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Request failed',
    };
  }
}

/**
 * Server Action: Reset Password
 */
export async function resetPasswordAction(
  formData: FormData
): Promise<ActionResult> {
  const token = formData.get('token') as string;
  const newPassword = formData.get('newPassword') as string;

  try {
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'Failed to reset password',
      };
    }

    return {
      success: true,
      message: 'Password reset successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Request failed',
    };
  }
}

