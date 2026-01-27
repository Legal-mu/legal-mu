'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function DashboardRedirect() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (user) {
            switch (user.role) {
                case 'ADMIN':
                    router.push('/admin');
                    break;
                case 'LAWYER':
                    router.push('/lawyer/dashboard');
                    break;
                case 'CLIENT':
                    router.push('/client/dashboard');
                    break;
                default:
                    router.push('/');
            }
        }
    }, [user, isAuthenticated, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1e3a8a] border-r-transparent"></div>
                <p className="mt-4 text-gray-600 font-medium">Redirecting to your dashboard...</p>
            </div>
        </div>
    );
}
