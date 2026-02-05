'use client';

import React, { useEffect, useState } from 'react';
import { X, Save, User as UserIcon, Briefcase, MapPin, Phone, Mail, Globe, Award, BookOpen, Star, FileText } from 'lucide-react';
import { useUpdateUser, useApproveLawyer } from '@/hooks/useAdminData';
import { User, UserStatus, LawyerProfile } from '@/types';
import ConfirmationModal from './ConfirmationModal';
import { getMediaUrl } from '@/lib/utils';

interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditUserModal({ user, isOpen, onClose }: EditUserModalProps) {
    const updateUser = useUpdateUser();
    const approveLawyer = useApproveLawyer();
    const [formData, setFormData] = useState<Partial<User>>({});
    const [lawyerProfile, setLawyerProfile] = useState<Partial<LawyerProfile>>({});

    // Confirmation Modal State
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // Active Tab State
    const [activeTab, setActiveTab] = useState<'account' | 'professional' | 'media' | 'content' | 'verification' | 'settings'>('account');

    // Form states for array fields (comma-separated strings in UI)
    const [practiceAreasStr, setPracticeAreasStr] = useState('');
    const [languagesStr, setLanguagesStr] = useState('');
    const [verifiedBadgesStr, setVerifiedBadgesStr] = useState('');
    const [authorizedFileTypesStr, setAuthorizedFileTypesStr] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                status: user.status,
            });
            const profile = user.lawyerProfile;
            if (profile) {
                setLawyerProfile(profile);
                setPracticeAreasStr((profile.practiceAreas || []).join(', '));
                setLanguagesStr((profile.languages || []).join(', '));
                setVerifiedBadgesStr((profile.verifiedBadges || []).join(', '));
                setAuthorizedFileTypesStr((profile.authorizedFileTypes || []).join(', '));
            } else {
                setLawyerProfile({});
                setPracticeAreasStr('');
                setLanguagesStr('');
                setVerifiedBadgesStr('');
                setAuthorizedFileTypesStr('');
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
            verifiedBadges: verifiedBadgesStr.split(',').map(s => s.trim()).filter(Boolean),
            authorizedFileTypes: authorizedFileTypesStr.split(',').map(s => s.trim()).filter(Boolean),
        };

        updateUser.mutate(
            {
                id: user.id,
                data: { ...formData, lawyerProfile: finalProfile as any }
            },
            {
                onSuccess: () => onClose(),
            }
        );
    };

    const isLawyer = user.role === 'LAWYER';

    const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
        <button
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all text-sm font-bold ${activeTab === id
                ? 'border-[#1e3a8a] text-[#1e3a8a] bg-blue-50/50'
                : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
        >
            <Icon size={16} />
            {label}
        </button>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-hidden">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
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

                {/* Tabs Navigation */}
                {isLawyer && (
                    <div className="flex border-b border-gray-100 overflow-x-auto bg-gray-50/30 scrollbar-hide">
                        <TabButton id="account" label="Account" icon={UserIcon} />
                        <TabButton id="professional" label="Professional" icon={Award} />
                        <TabButton id="media" label="Media & Social" icon={Globe} />
                        <TabButton id="content" label="Content" icon={FileText} />
                        <TabButton id="verification" label="Verification" icon={Star} />
                        <TabButton id="settings" label="Settings" icon={Globe} />
                    </div>
                )}

                {/* Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 focus:outline-none bg-white">
                    {/* Status Banner */}
                    {user.status === 'PENDING' && (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3 text-amber-800 shrink-0">
                            <Star className="text-amber-500" size={20} />
                            <div>
                                <p className="font-bold">Pending Review</p>
                                <p className="text-sm opacity-90">Please verify all profile information below before changing the status to Approved.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <UserIcon size={18} />
                                    <h4>Basic Information</h4>
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
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                        <MapPin size={18} />
                                        <h4>Firm & Location</h4>
                                    </div>
                                    <div className="space-y-4">
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
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Office Address</label>
                                            <textarea
                                                rows={2}
                                                value={lawyerProfile.address || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, address: e.target.value })}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City</label>
                                                <input
                                                    type="text"
                                                    value={lawyerProfile.city || ''}
                                                    onChange={(e) => setLawyerProfile({ ...lawyerProfile, city: e.target.value })}
                                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Postal Code</label>
                                                <input
                                                    type="text"
                                                    value={lawyerProfile.postal_code || ''}
                                                    onChange={(e) => setLawyerProfile({ ...lawyerProfile, postal_code: e.target.value })}
                                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Country</label>
                                            <input
                                                type="text"
                                                value={lawyerProfile.country || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, country: e.target.value })}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    )}

                    {activeTab === 'professional' && isLawyer && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <Award size={18} />
                                    <h4>Qualifications</h4>
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
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Legal Category</label>
                                            <select
                                                value={lawyerProfile.legalCategory || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, legalCategory: e.target.value as any })}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            >
                                                <option value="">None</option>
                                                <option value="SENIOR_COUNSEL_SILK">Senior Counsel / Silk</option>
                                                <option value="LEADING_LAW_FIRM">Leading Law Firm</option>
                                                <option value="INTERNATIONAL_CHAMBERS">International Chambers</option>
                                                <option value="NOTARIAL_STUDY">Notarial Study</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Admission Year</label>
                                            <input
                                                type="number"
                                                value={lawyerProfile.admissionYear || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, admissionYear: parseInt(e.target.value) })}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            />
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
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CV URL</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                value={lawyerProfile.cvUrl || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, cvUrl: e.target.value })}
                                                className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                                placeholder="Link to CV (PDF)..."
                                            />
                                            {lawyerProfile.cvUrl && (
                                                <a
                                                    href={getMediaUrl(lawyerProfile.cvUrl)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
                                                    title="View CV"
                                                >
                                                    <FileText size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <BookOpen size={18} />
                                    <h4>Expertise</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Practice Areas (Comma separated)</label>
                                        <textarea
                                            rows={3}
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
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'media' && isLawyer && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <UserIcon size={18} />
                                    <h4>Profile Visuals</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Headshot URL</label>
                                        {lawyerProfile.headshotUrl && (
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-sm mb-2">
                                                <img src={getMediaUrl(lawyerProfile.headshotUrl)} alt="Headshot" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <input
                                            type="text"
                                            value={lawyerProfile.headshotUrl || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, headshotUrl: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="Image URL..."
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
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                value={lawyerProfile.phoneNumber || ''}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, phoneNumber: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <Star size={18} />
                                    <h4>Social Media Links</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">LinkedIn</label>
                                        <input
                                            type="text"
                                            value={lawyerProfile.linkedinUrl || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, linkedinUrl: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Twitter</label>
                                        <input
                                            type="text"
                                            value={lawyerProfile.twitterUrl || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, twitterUrl: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="https://twitter.com/..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">YouTube</label>
                                        <input
                                            type="text"
                                            value={lawyerProfile.youtubeUrl || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, youtubeUrl: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="https://youtube.com/..."
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'content' && isLawyer && (
                        <div className="grid grid-cols-1 gap-8">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <FileText size={18} />
                                    <h4>Biographies & Content</h4>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Short Biography (Max 100 words)</label>
                                        <textarea
                                            rows={4}
                                            value={lawyerProfile.biography || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, biography: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm leading-relaxed"
                                            placeholder="Standard bio for directory..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Extended Biography (Max 300 words)</label>
                                        <textarea
                                            rows={8}
                                            value={lawyerProfile.extendedBiography || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, extendedBiography: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm leading-relaxed"
                                            placeholder="Full bio for profile page..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Featured Success Stories</label>
                                        <textarea
                                            rows={4}
                                            value={lawyerProfile.featuredSuccessStories || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, featuredSuccessStories: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm leading-relaxed"
                                            placeholder="Key wins or landmark cases..."
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'verification' && isLawyer && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <Star size={18} />
                                    <h4>Verification Details</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Registration Number</label>
                                        <input
                                            type="text"
                                            value={lawyerProfile.registrationNumber || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, registrationNumber: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verified Badges / Document URLs (Comma separated)</label>
                                        <textarea
                                            rows={3}
                                            value={verifiedBadgesStr}
                                            onChange={(e) => setVerifiedBadgesStr(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-sm"
                                            placeholder="Certificates, IDs, etc..."
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'settings' && isLawyer && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <Globe size={18} />
                                    <h4>Integration Settings</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Show Google Reviews</p>
                                            <p className="text-xs text-gray-500">Display ratings on profile</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={lawyerProfile.showGoogleReviews}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, showGoogleReviews: e.target.checked })}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3a8a]"></div>
                                        </label>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Google Business Profile URL</label>
                                        <input
                                            type="text"
                                            value={lawyerProfile.googleBusinessProfileUrl || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, googleBusinessProfileUrl: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="https://g.page/..."
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[#1e3a8a] font-bold border-b border-blue-50 pb-2">
                                    <Mail size={18} />
                                    <h4>Client Upload Features</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Enable Client Data Upload</p>
                                            <p className="text-xs text-gray-500">Allow clients to send docs</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={lawyerProfile.clientDataUploadEnabled}
                                                onChange={(e) => setLawyerProfile({ ...lawyerProfile, clientDataUploadEnabled: e.target.checked })}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3a8a]"></div>
                                        </label>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Notification Email</label>
                                        <input
                                            type="email"
                                            value={lawyerProfile.clientUploadNotificationEmail || ''}
                                            onChange={(e) => setLawyerProfile({ ...lawyerProfile, clientUploadNotificationEmail: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Authorized File Types (Comma separated)</label>
                                        <input
                                            type="text"
                                            value={authorizedFileTypesStr}
                                            onChange={(e) => setAuthorizedFileTypesStr(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="PDF, DOCX, JPG..."
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
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
                            type="button"
                            onClick={() => setIsConfirmOpen(true)}
                            disabled={approveLawyer.isPending}
                            className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save size={18} />
                            Approve Lawyer
                        </button>
                    ) : (
                        <button
                            type="submit"
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

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => approveLawyer.mutate(user.id, { onSuccess: () => onClose() })}
                title="Approve Lawyer"
                message="Do you want to Approve this lawyer profile? This will notify the lawyer and make their profile public."
                confirmText="Approve Now"
                variant="success"
            />
        </div>
    );
}
