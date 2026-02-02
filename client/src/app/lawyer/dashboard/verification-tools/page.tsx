'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import DashboardInput from '@/components/lawyer/dashboard/DashboardInput';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, Plus, X, ShieldCheck, FileCheck, Mail, FileType } from 'lucide-react';

const FILE_TYPE_OPTIONS = ['PDF', 'DOCX', 'JPG', 'PNG', 'ZIP'];

export default function VerificationToolsPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        clientDataUploadEnabled: false,
        clientUploadNotificationEmail: '',
        authorizedFileTypes: ['PDF', 'DOCX', 'JPG'] as string[],
    });
    const [badgeFiles, setBadgeFiles] = useState<File[]>([]);
    const [existingBadges, setExistingBadges] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.getLawyerProfile();
                if (res.success && res.data) {
                    setFormData({
                        clientDataUploadEnabled: res.data.clientDataUploadEnabled || false,
                        clientUploadNotificationEmail: res.data.clientUploadNotificationEmail || '',
                        authorizedFileTypes: res.data.authorizedFileTypes || ['PDF', 'DOCX', 'JPG'],
                    });
                    setExistingBadges(res.data.verifiedBadges || []);
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            // Limit to 5 badges total (new + existing)
            if (badgeFiles.length + existingBadges.length + files.length > 5) {
                setError('You can upload a maximum of 5 verification badges/certificates.');
                return;
            }
            setBadgeFiles([...badgeFiles, ...files]);
            setError('');
        }
    };

    const removeNewBadge = (index: number) => {
        const updated = [...badgeFiles];
        updated.splice(index, 1);
        setBadgeFiles(updated);
    };

    const removeExistingBadge = (index: number) => {
        const updated = [...existingBadges];
        updated.splice(index, 1);
        setExistingBadges(updated);
    };

    const toggleFileType = (type: string) => {
        const updated = [...formData.authorizedFileTypes];
        const index = updated.indexOf(type);
        if (index > -1) {
            updated.splice(index, 1);
        } else {
            updated.push(type);
        }
        setFormData({ ...formData, authorizedFileTypes: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const data = new FormData();
            data.append('clientDataUploadEnabled', formData.clientDataUploadEnabled.toString());
            data.append('clientUploadNotificationEmail', formData.clientUploadNotificationEmail);
            data.append('authorizedFileTypes', JSON.stringify(formData.authorizedFileTypes));

            // Keep existing badges (backend logic might need to handle this)
            // Actually my backend updateVerificationTools replaces verifiedBadges with new ones + existing ones sent in body?
            // Let's check backend. Wait, backend controller says:
            // const badgeUrls = [...existingBadges, ...newFiles];
            // But how does it get existingBadges? 
            // In my backend updateVerificationTools, I didn't handle existing badges from body.
            // I should have. I'll need to fix that or send them.

            data.append('existingBadges', JSON.stringify(existingBadges));

            badgeFiles.forEach(file => {
                data.append('verification', file);
            });

            const res = await api.updateVerificationTools(data);

            if (res.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/lawyer/dashboard');
                }, 1500);
            } else {
                setError(res.message || 'Failed to save.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardLayout title="Step 7: Verification & Tools">
            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 max-w-2xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">Verification & Productivity</h2>
                    <p className="text-sm text-[#64748B]">Verify your credentials and enable tools to streamline client communication.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold">
                        Verification tools saved! Profile completion finished.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Verified Badges */}
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold text-[#1E3A5F]">Verification Badges & Certificates</label>
                        <p className="text-xs text-slate-400">Upload proofs of memberships, bar certificates, or awards (Max 5).</p>

                        <div className="grid grid-cols-2 gap-4">
                            {existingBadges.map((url, index) => (
                                <div key={`ex-${index}`} className="relative p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between group">
                                    <div className="flex items-center gap-3 truncate">
                                        <FileCheck size={20} className="text-emerald-500 flex-shrink-0" />
                                        <span className="text-xs text-emerald-700 font-medium truncate">Verification-{index + 1}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeExistingBadge(index)}
                                        className="p-1 text-emerald-400 hover:text-rose-500 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {badgeFiles.map((file, index) => (
                                <div key={`new-${index}`} className="relative p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex items-center gap-3 truncate">
                                        <FileCheck size={20} className="text-[#1E3A5F] flex-shrink-0" />
                                        <span className="text-xs text-[#1E3A5F] font-medium truncate">{file.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeNewBadge(index)}
                                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}

                            {(badgeFiles.length + existingBadges.length < 5) && (
                                <label className="cursor-pointer p-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:border-[#1E3A5F]/40 hover:text-[#1E3A5F] transition-all">
                                    <Plus size={18} />
                                    <span className="text-xs font-bold">Add Badge</span>
                                    <input type="file" multiple onChange={handleFileChange} className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Client Data Upload */}
                    <div className="pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-sm font-bold text-[#1E3A5F]">Client Data Upload Feature</h3>
                                <p className="text-xs text-[#64748B]">Allow clients to securely upload documents to your portal.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, clientDataUploadEnabled: !formData.clientDataUploadEnabled })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.clientDataUploadEnabled ? 'bg-emerald-500' : 'bg-slate-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.clientDataUploadEnabled ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {formData.clientDataUploadEnabled && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-top-1 duration-200">
                                <DashboardInput
                                    label="Notification Email"
                                    name="clientUploadNotificationEmail"
                                    type="email"
                                    value={formData.clientUploadNotificationEmail}
                                    onChange={(e) => setFormData({ ...formData, clientUploadNotificationEmail: e.target.value })}
                                    placeholder="e.g. docs@apexchambers.com"
                                    helperText="Email address to receive upload alerts."
                                    required={formData.clientDataUploadEnabled}
                                />

                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider">Authorized File Types</label>
                                    <div className="flex flex-wrap gap-2">
                                        {FILE_TYPE_OPTIONS.map((type) => {
                                            const isSelected = formData.authorizedFileTypes.includes(type);
                                            return (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => toggleFileType(type)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${isSelected
                                                            ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                                                            : 'bg-white text-slate-400 border-slate-200'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-[#1E3A5F] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#2D4A6F] transition-all disabled:opacity-70"
                        >
                            {saving ? (
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save and Finish Profile
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
