'use server';

import { api } from '@/lib/api';
import { User } from '@/types';
import { revalidatePath } from 'next/cache';

export async function updateUserAction(id: string, data: Partial<User> & { lawyerProfile?: any }) {
    try {
        const response = await api.updateUser(id, data);
        revalidatePath('/admin/lawyers');
        revalidatePath('/admin/clients');
        return response;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Failed to update user',
        };
    }
}

export async function deleteUserAction(id: string) {
    try {
        const response = await api.deleteUser(id);
        revalidatePath('/admin/lawyers');
        revalidatePath('/admin/clients');
        return response;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Failed to delete user',
        };
    }
}

export async function updateLawyerStatusAction(id: string, status: 'APPROVED' | 'REJECTED') {
    return updateUserAction(id, { status: status as any });
}

export async function approveLawyerAction(id: string) {
    return updateLawyerStatusAction(id, 'APPROVED');
}

export async function rejectLawyerAction(id: string) {
    return updateLawyerStatusAction(id, 'REJECTED');
}
