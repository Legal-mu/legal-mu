'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function createSubscriptionAction(planId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return { success: false, message: 'User not authenticated. Please login again.' };
        }

        const response = await fetch(`${API_URL}/api/stripe/create-subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ planId }),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                message: errorData.message || `Server error: ${response.status}`
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Proxy subscription error:', error);
        return { success: false, message: 'Could not connect to payment server' };
    }
}
