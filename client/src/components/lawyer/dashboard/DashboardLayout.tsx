'use client';

import { ReactNode, useEffect, useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface DashboardLayoutProps {
    children: ReactNode;
    title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [profileStatus, setProfileStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'LAWYER') {
            router.push('/login');
            return;
        }

        const fetchStatus = async () => {
            try {
                const res = await api.getLawyerProfileStatus();
                if (res.success) {
                    setProfileStatus(res.data);
                }
            } catch (error) {
                console.error('Failed to fetch profile status:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [isAuthenticated, user, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A5F]"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-jost">
            <DashboardSidebar completedSteps={profileStatus?.completedSteps || []} />

            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-[#1E3A5F]">{title}</h1>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-[#1E3A5F]">{user?.firstName} {user?.lastName}</span>
                            <span className="text-xs text-[#64748B]">Lawyer Account</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-slate-200 flex items-center justify-center text-[#1E3A5F] font-bold">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 max-w-5xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
