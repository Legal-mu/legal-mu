/**
 * Server Actions for admin functions
 */

'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

interface ActionResult<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Array<{ field: string; message: string }>;
}

/**
 * Server Action: Update Lawyer Status
 */
export async function updateLawyerStatusAction(
    id: string,
    status: 'APPROVED' | 'REJECTED'
): Promise<ActionResult> {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const response = await fetch(`${API_URL}/api/admin/lawyers/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieHeader,
            },
            body: JSON.stringify({ status }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            return {
                success: false,
                message: data.message || 'Failed to update lawyer status',
            };
        }

        // Revalidate the dashboard to show updated data
        revalidatePath('/dashboard');

        return {
            success: true,
            message: data.message || `Lawyer application ${status.toLowerCase()} successfully`,
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}
