'use client';

import { useState, useTransition } from 'react';
import type { User } from '@/types';
import { UserStatus } from '@/types';
import { formatDate } from '@/lib/utils';
import { updateLawyerStatusAction } from '@/app/actions/admin';

interface AdminLawyersTableProps {
    lawyers: User[];
}

export default function AdminLawyersTable({ lawyers: initialLawyers }: AdminLawyersTableProps) {
    const [lawyers, setLawyers] = useState(initialLawyers);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleStatusUpdate = async (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
        startTransition(async () => {
            setError(null);
            const result = await updateLawyerStatusAction(id, newStatus);

            if (result.success) {
                // Optimistically update local state if needed, 
                // but revalidatePath will handle the server-side refresh
                setLawyers(prev =>
                    prev.map(l => l.id === id ? { ...l, status: newStatus as UserStatus } : l)
                );
            } else {
                setError(result.message || 'Failed to update status');
            }
        });
    };

    const getStatusBadgeClass = (status?: UserStatus) => {
        switch (status) {
            case UserStatus.APPROVED:
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case UserStatus.REJECTED:
                return 'bg-red-100 text-red-800 border-red-200';
            case UserStatus.PENDING:
                return 'bg-amber-100 text-amber-800 border-amber-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {error && (
                <div className="p-4 bg-red-50 border-b border-red-100 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Area of Law</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Joined</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {lawyers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-500 italic">
                                    No lawyers found.
                                </td>
                            </tr>
                        ) : (
                            lawyers.map((lawyer) => (
                                <tr key={lawyer.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {lawyer.firstName} {lawyer.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lawyer.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lawyer.lawyerProfile?.legalCategory || '—'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lawyer.lawyerProfile?.practiceAreas?.join(', ') || '—'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeClass(lawyer.status)}`}>
                                            {lawyer.status || 'UNKNOWN'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{formatDate(lawyer.createdAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {lawyer.status === UserStatus.PENDING && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(lawyer.id, 'APPROVED')}
                                                    disabled={isPending}
                                                    className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(lawyer.id, 'REJECTED')}
                                                    disabled={isPending}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                        {lawyer.status !== UserStatus.PENDING && (
                                            <span className="text-slate-400 italic text-xs">No actions available</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
