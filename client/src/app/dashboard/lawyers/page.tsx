import { redirect } from 'next/navigation';
import { requireRole } from '../../../lib/auth';
import LogoutButton from '../../../components/LogoutButton';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import type { User } from '../../../types';

// Mark this page as dynamic (uses cookies)
export const dynamic = 'force-dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// Fetch lawyers from API
async function fetchLawyers(): Promise<{ lawyers: User[]; total: number }> {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();

        const response = await fetch(`${API_URL}/api/admin/lawyers`, {
            headers: {
                Cookie: cookieHeader,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            return { lawyers: [], total: 0 };
        }

        const data = await response.json();
        return data.data || { lawyers: [], total: 0 };
    } catch (error) {
        console.error('Error fetching lawyers:', error);
        return { lawyers: [], total: 0 };
    }
}

// Loading component
function LawyersLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-400 border-r-transparent"></div>
                <p className="mt-4 text-purple-200 font-medium">Loading lawyers...</p>
            </div>
        </div>
    );
}

// Status badge component
function StatusBadge({ isActive }: { isActive: boolean }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isActive
                ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30'
                : 'bg-red-500/20 text-red-300 ring-1 ring-red-500/30'
                }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
            ></span>
            {isActive ? 'Active' : 'Inactive'}
        </span>
    );
}

// Format date helper
function formatDate(dateString?: string | Date | null): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

// Lawyers table component
function LawyersTable({ lawyers }: { lawyers: User[] }) {
    if (lawyers.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 mb-4">
                    <svg
                        className="h-8 w-8 text-purple-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No lawyers registered yet</h3>
                <p className="text-slate-400">Lawyers will appear here once they register.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Lawyer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Date of Birth
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Registered
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {lawyers.map((lawyer, index) => (
                        <tr
                            key={lawyer.id}
                            className="group transition-colors hover:bg-white/5"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-purple-500/20">
                                        {lawyer.firstName?.[0]?.toUpperCase()}
                                        {lawyer.lastName?.[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">
                                            {lawyer.firstName} {lawyer.lastName}
                                        </div>
                                        <div className="text-sm text-slate-400">ID: {lawyer.id.slice(0, 8)}...</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <svg
                                        className="h-4 w-4 text-slate-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {lawyer.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                                {formatDate(lawyer.dateOfBirth)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                                {formatDate(lawyer.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge isActive={lawyer.isActive ?? true} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Dashboard content component
async function LawyersDashboardContent() {
    // Require ADMIN role - redirects to /dashboard if not admin
    const user = await requireRole('ADMIN');

    // Fetch lawyers
    const { lawyers, total } = await fetchLawyers();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl"></div>
                <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl"></div>
                <div className="absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Legal-MU
                            </h1>
                            <div className="hidden md:flex items-center gap-1">
                                <a
                                    href="/dashboard"
                                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                >
                                    Dashboard
                                </a>
                                <span className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg">
                                    Lawyers
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                                <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
                                <span className="text-sm font-medium text-purple-300">Admin</span>
                            </div>
                            <span className="text-sm text-slate-300">
                                {user.firstName} {user.lastName}
                            </span>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Registered Lawyers</h2>
                    <p className="text-slate-400">
                        Manage and view all lawyers registered on the platform.
                    </p>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all hover:bg-white/10 hover:border-white/20">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Total Lawyers</p>
                                <p className="text-2xl font-bold text-white">{total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all hover:bg-white/10 hover:border-white/20">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Active</p>
                                <p className="text-2xl font-bold text-white">
                                    {lawyers.filter((l) => l.isActive !== false).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all hover:bg-white/10 hover:border-white/20">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">This Month</p>
                                <p className="text-2xl font-bold text-white">
                                    {
                                        lawyers.filter((l) => {
                                            if (!l.createdAt) return false;
                                            const created = new Date(l.createdAt);
                                            const now = new Date();
                                            return (
                                                created.getMonth() === now.getMonth() &&
                                                created.getFullYear() === now.getFullYear()
                                            );
                                        }).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all hover:bg-white/10 hover:border-white/20">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">Inactive</p>
                                <p className="text-2xl font-bold text-white">
                                    {lawyers.filter((l) => l.isActive === false).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lawyers table */}
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                        <h3 className="text-lg font-semibold text-white">All Lawyers</h3>
                    </div>
                    <LawyersTable lawyers={lawyers} />
                </div>
            </main>
        </div>
    );
}

// Main page component with Suspense boundary
export default function LawyersDashboardPage() {
    return (
        <Suspense fallback={<LawyersLoading />}>
            <LawyersDashboardContent />
        </Suspense>
    );
}
