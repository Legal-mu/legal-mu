'use client';

import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, Upload, User, X } from 'lucide-react';
import Image from 'next/image';
import { getMediaUrl } from '@/lib/utils';

export default function BiographyPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [biography, setBiography] = useState('');
    const [extendedBiography, setExtendedBiography] = useState('');
    const [headshot, setHeadshot] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.getLawyerProfile();
                if (res.success && res.data) {
                    setBiography(res.data.biography || '');
                    setExtendedBiography(res.data.extendedBiography || '');
                    if (res.data.headshotUrl) {
                        setPreviewUrl(getMediaUrl(res.data.headshotUrl));
                    }
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
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB.');
                return;
            }
            setHeadshot(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBiography(e.target.value);
        setSuccess(false);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!biography) {
            setError('Biography is required.');
            return;
        }

        const wordCount = biography.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > 100) {
            setError('Short biography must not exceed 100 words.');
            return;
        }

        const extendedWordCount = extendedBiography.trim().split(/\s+/).filter(Boolean).length;
        if (extendedWordCount > 300) {
            setError('Extended biography must not exceed 300 words.');
            return;
        }

        if (!headshot && !previewUrl) {
            setError('A headshot image is required.');
            return;
        }

        setSaving(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('biography', biography);
            formData.append('extendedBiography', extendedBiography);
            if (headshot) {
                formData.append('headshot', headshot);
            }

            const res = await api.updateBiography(formData);

            if (res.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/lawyer/dashboard/social-media');
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

    const wordCount = biography.trim().split(/\s+/).filter(Boolean).length;
    const extendedWordCount = extendedBiography.trim().split(/\s+/).filter(Boolean).length;

    return (
        <DashboardLayout title="Step 4: Biography & Headshot">
            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 max-w-2xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">Personal Branding</h2>
                    <p className="text-sm text-[#64748B]">Introduce yourself to potential clients with a professional photo and bio.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold">
                        Biography saved! Redirecting to next step...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Headshot Upload */}
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold text-[#1E3A5F]">Headshot Photo <span className="text-rose-500 ml-1">*</span></label>
                        <div className="flex items-center gap-6">
                            <div className="relative w-32 h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group">
                                {previewUrl ? (
                                    <>
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setHeadshot(null);
                                                setPreviewUrl(null);
                                            }}
                                            className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </>
                                ) : (
                                    <User size={40} className="text-slate-300" />
                                )}
                            </div>

                            <div className="flex-1">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#1E3A5F] hover:bg-slate-50 transition-all flex items-center gap-2"
                                >
                                    <Upload size={18} />
                                    Upload Photo
                                </button>
                                <p className="text-[11px] text-[#94A3B8] mt-2">
                                    JPG, PNG or WEBP. Max size 5MB. A professional business headshot is recommended.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Biography */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-[#1E3A5F]">Professional Biography (Short) <span className="text-rose-500 ml-1">*</span></label>
                            <span className={`text-[11px] font-bold ${wordCount > 100 ? 'text-rose-500' : 'text-slate-400'}`}>
                                {wordCount}/100 words
                            </span>
                        </div>
                        <textarea
                            value={biography}
                            onChange={(e) => { setBiography(e.target.value); setSuccess(false); setError(''); }}
                            rows={4}
                            placeholder="A brief summary for search results and previews..."
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all placeholder:text-slate-400 resize-none"
                            required
                        />
                        <p className="text-[11px] text-slate-400">Keep it concise and professional. Best for quick reading.</p>
                    </div>

                    {/* Extended Biography */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-[#1E3A5F]">Detailed Experience & Biography <span className="text-rose-500 ml-1">*</span></label>
                            <span className={`text-[11px] font-bold ${extendedWordCount > 300 ? 'text-rose-500' : 'text-slate-400'}`}>
                                {extendedWordCount}/300 words
                            </span>
                        </div>
                        <textarea
                            value={extendedBiography}
                            onChange={(e) => { setExtendedBiography(e.target.value); setSuccess(false); setError(''); }}
                            rows={8}
                            placeholder="Provide a more detailed background of your legal career, notable cases, and philosophy..."
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all placeholder:text-slate-400 resize-none"
                            required
                        />
                        <p className="text-[11px] text-slate-400">This will be shown on your full profile page. Share your expertise in detail.</p>
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
                                    Save and Continue
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
