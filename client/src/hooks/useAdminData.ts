import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { User } from '@/types';
import toast from 'react-hot-toast';

export function useLawyers() {
    return useQuery({
        queryKey: ['admin', 'lawyers'],
        queryFn: async () => {
            const response = await api.getLawyers();
            if (!response.success) {
                throw new Error(response.message || 'Failed to fetch lawyers');
            }
            return response.data || [];
        },
    });
}

export function useClients() {
    return useQuery({
        queryKey: ['admin', 'clients'],
        queryFn: async () => {
            const response = await api.getClients();
            if (!response.success) {
                throw new Error(response.message || 'Failed to fetch clients');
            }
            return response.data || [];
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<User> & { lawyerProfile?: any } }) =>
            api.updateUser(id, data),
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries({ queryKey: ['admin'] });
                toast.success(response.message || 'User updated successfully');
            } else {
                toast.error(response.message || 'Failed to update user');
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || 'An error occurred');
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => api.deleteUser(id),
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries({ queryKey: ['admin'] });
                toast.success(response.message || 'User deleted successfully');
            } else {
                toast.error(response.message || 'Failed to delete user');
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || 'An error occurred');
        },
    });
}
