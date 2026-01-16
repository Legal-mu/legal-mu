'use client';

import React, { useState } from 'react';
import {
    useLawyers,
    useUpdateUser,
    useDeleteUser
} from '@/hooks/useAdminData';
import {
    CheckCircle,
    XCircle,
    Edit,
    Trash2,
    MoreVertical,
    Search,
    Filter,
    User as UserIcon,
    ShieldCheck,
    ShieldClose
} from 'lucide-react';
import { UserStatus, User } from '@/types';
import EditUserModal from '../components/EditUserModal';

export default function LawyersManagement() {
    const { data: lawyers, isLoading } = useLawyers();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const filteredLawyers = lawyers?.filter((lawyer: any) =>
        `${lawyer.firstName} ${lawyer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApprove = (id: string) => {
        updateUser.mutate({ id, data: { status: UserStatus.APPROVED } });
    };

    const handleReject = (id: string) => {
        if (confirm('Reviewing this lawyer - Rejection will delete their application. Proceed?')) {
            deleteUser.mutate(id);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this lawyer? This action cannot be undone.')) {
            deleteUser.mutate(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Lawyer Management</h2>
                    <p className="text-gray-500 mt-1">Review, approve, and manage lawyer accounts.</p>
                </div>
                <button className="bg-[#1e3a8a] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center gap-2">
                    <span>Export Data</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search lawyers by name or email..."
                        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-100 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                        <Filter size={18} />
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Lawyer</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Registered</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400">Loading lawyers...</td>
                                </tr>
                            ) : filteredLawyers?.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400">No lawyers found</td>
                                </tr>
                            ) : filteredLawyers?.map((lawyer: any) => (
                                <tr key={lawyer.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e3a8a] font-bold border border-blue-100">
                                                {lawyer.firstName[0]}{lawyer.lastName[0]}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">{lawyer.firstName} {lawyer.lastName}</div>
                                                <div className="text-xs text-gray-500">{lawyer.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lawyer.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                            lawyer.status === 'REJECTED' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                'bg-amber-50 text-amber-700 border border-amber-100'
                                            }`}>
                                            {lawyer.status.charAt(0) + lawyer.status.slice(1).toLowerCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(lawyer.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {lawyer.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(lawyer.id)}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                        title="Approve"
                                                    >
                                                        <ShieldCheck size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(lawyer.id)}
                                                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                        title="Reject"
                                                    >
                                                        <ShieldClose size={18} />
                                                    </button>
                                                </>
                                            )}
                                            {lawyer.status === 'REJECTED' && (
                                                <button
                                                    onClick={() => handleApprove(lawyer.id)}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Approve"
                                                >
                                                    <ShieldCheck size={18} />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleEdit(lawyer)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(lawyer.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <EditUserModal
                user={editingUser}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </div>
    );
}
