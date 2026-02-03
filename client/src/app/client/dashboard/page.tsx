'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Jost } from 'next/font/google';

const jost = Jost({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export default function ClientDashboard() {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (user && user.role !== 'CLIENT') {
            // Redirect if not a client
            if (user.role === 'LAWYER') router.push('/lawyer/dashboard');
            else if (user.role === 'ADMIN') router.push('/admin');
        }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || !user) {
        return null; // Or a loading spinner
    }

    return (
        <div className={`min-h-screen bg-gray-50 pt-24 ${jost.className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="h-20 w-20 rounded-full bg-[#1A2853] flex items-center justify-center text-white text-2xl font-bold">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[#1A2853]">Welcome back, {user.firstName}!</h1>
                            <p className="text-gray-500">Client Dashboard</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Find a Lawyer Card */}
                        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-[#1A2853] mb-2">Find a Lawyer</h3>
                            <p className="text-gray-600 mb-4">Browse our directory of qualified legal professionals.</p>
                            <button
                                onClick={() => router.push('/lawyers-directory')}
                                className="px-4 py-2 bg-[#1A2853] text-white rounded-lg text-sm font-medium hover:bg-[#111827] transition-colors"
                            >
                                Search Lawyers
                            </button>
                        </div>

                        {/* My Cases Card (Placeholder) */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-[#1A2853] mb-2">My Cases</h3>
                            <p className="text-gray-600 mb-4">View and manage your active legal cases.</p>
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">Coming Soon</span>
                        </div>

                        {/* Messages Card (Placeholder) */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold text-[#1A2853] mb-2">Messages</h3>
                            <p className="text-gray-600 mb-4">Check your messages from lawyers.</p>
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
