'use client';

import React, { useEffect, useState } from 'react';
import { X, Save, User as UserIcon, Briefcase, MapPin, Phone, Mail, Globe, Award, BookOpen, Star, FileText } from 'lucide-react';
import { useUpdateUser, useApproveLawyer } from '@/hooks/useAdminData';
import { User, UserStatus } from '@/types';

interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditUserModal({ user, isOpen, onClose }: EditUserModalProps) {
    const updateUser = useUpdateUser();
    const approveLawyer = useApproveLawyer();
    const [formData, setFormData] = useState<Partial<User>>({});
    const [lawyerProfile, setLawyerProfile] = useState<any>({});

    // Form states for array fields (comma-separated strings in UI)
    const [practiceAreasStr, setPracticeAreasStr] = useState('');
    const [languagesStr, setLanguagesStr] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                status: user.status,
            });

            if (user.lawyerProfile) {
                setLawyerProfile(user.lawyerProfile);
                // Initialize array fields
                setPracticeAreasStr((user.lawyerProfile.practiceAreas || []).join(', '));
                setLanguagesStr((user.lawyerProfile.languages || []).join(', '));
            } else {
                setLawyerProfile({});
                setPracticeAreasStr('');
                setLanguagesStr('');
            }
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare arrays from strings
        const finalProfile = {
            ...lawyerProfile,
            practiceAreas: practiceAreasStr.split(',').map(s => s.trim()).filter(Boolean),
            languages: languagesStr.split(',').map(s => s.trim()).filter(Boolean),
        };

        updateUser.mutate(
            {
                id: user.id,
                data: { ...formData, lawyerProfile: finalProfile }
            },
            {
                onSuccess: () => onClose(),
            }
        );
    };

    const isLawyer = user.role === 'LAWYER';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg text-[#1e3a8a]">
                            {isLawyer ? <Briefcase size={20} /> : <UserIcon size={20} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">
                                {user.status === 'PENDING' ? 'Review' : 'Edit'} {isLawyer ? 'Lawyer Application' : 'Client Profile'}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {isLawyer ? 'Examine profile details before approval.' : `Update account information for ${user.firstName} ${user.lastName}`}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 focus:outline-none">
                    {/* Status Banner */}
                    {user.status === 'PENDING' && (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3 text-amber-800">
                            <Star className="text-amber-500" size={20} />
                            <div>
                                <p className="font-bold">Pending Review</p>
                                <p className="text-sm opacity-90">Please verify all profile information below before changing the status to Approved.</p>
                            </div>
                        </div>
                    )}

                    {/* Grid Layout for Forms */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Left Column: Basic Account Info */}
                        <div className="space-y-8">
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-semibold border-b border-blue-50 pb-2">
                                    <UserIcon size={18} />
                                    <h4>Account Information</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName || ''}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName || ''}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Account Status</label>
                                    <select
                                        value={formData.status || ''}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    >
                                        <option value="PENDING">Pending Approval</option>
                                        <option value="APPROVED">Approved / Active</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </div>
                            </section>

                            {isLawyer && (
                                <section className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#1e3a8a] font-semibold border-b border-blue-50 pb-2">
                                        <MapPin size={18} />
                                        <h4>Contact & Firm Details</h4>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Firm Name</label>
                                        <input
                                            type="text"
                                            value={lawyerProfile.firmName || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, firmName: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</label>
                                        <input
                                            type="text"
                                            value={lawyerProfile.phoneNumber || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, phoneNumber: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Office Address</label>
                                        <textarea
                                            rows={2}
                                            value={lawyerProfile.address || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, address: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Website URL</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                value={lawyerProfile.websiteUrl || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, websiteUrl: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Right Column: Professional Profile (Lawyer Only) */}
                        {isLawyer && (
                            <div className="space-y-8">
                                <section className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#1e3a8a] font-semibold border-b border-blue-50 pb-2">
                                        <Briefcase size={18} />
                                        <h4>Professional Background</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Legal Name</label>
                                            <input
                                                type="text"
                                                value={lawyerProfile.fullLegalName || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, fullLegalName: e.target.value })}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Professional Title</label>
                                                <select
                                                    value={lawyerProfile.title || 'BARRISTER'}
                                                    onChange={(e) => setLawyerProfile({ ...lawyerProfile, title: e.target.value })}
                                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                >
                                                    <option value="BARRISTER">Barrister</option>
                                                    <option value="ATTORNEY">Attorney</option>
                                                    <option value="NOTARY">Notary</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Experience (Years)</label>
                                                <input
                                                    type="number"
                                                    value={lawyerProfile.experienceYears || 0}
                                                    onChange={(e) => setLawyerProfile({ ...lawyerProfile, experienceYears: parseInt(e.target.value) })}
                                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Registration Number</label>
                                            <input
                                                type="text"
                                                value={lawyerProfile.registrationNumber || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, registrationNumber: e.target.value })}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#1e3a8a] font-semibold border-b border-blue-50 pb-2">
                                        <FileText size={18} />
                                        <h4>Biography & Expertise</h4>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Biography</label>
                                        <textarea
                                            rows={4}
                                            value={lawyerProfile.biography || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, biography: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm leading-relaxed"
                                            placeholder="Enter a professional biography..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Practice Areas (Comma separated)</label>
                                        <textarea
                                            rows={2}
                                            value={practiceAreasStr}
                                            onChange={(e) => setPracticeAreasStr(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm"
                                            placeholder="Criminal Law, Family Law..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Languages (Comma separated)</label>
                                        <input
                                            type="text"
                                            value={languagesStr}
                                            onChange={(e) => setLanguagesStr(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                                            placeholder="English, French, Creole..."
                                        />
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 px-8 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Cancel
                    </button>

                    {user.status === 'PENDING' ? (
                        <button
                            onClick={() => {
                                const confirmMsg = "Do you want to Approve this lawyer profile?";
                                if (window.confirm(confirmMsg)) {
                                    approveLawyer.mutate(user.id, { onSuccess: () => onClose() });
                                }
                            }}
                            disabled={approveLawyer.isPending}
                            className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save size={18} />
                            Approve Lawyer
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={updateUser.isPending}
                            className="bg-[#1e3a8a] text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 disabled:opacity-50"
                        >
                            {updateUser.isPending ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save size={18} />
                            )}
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
