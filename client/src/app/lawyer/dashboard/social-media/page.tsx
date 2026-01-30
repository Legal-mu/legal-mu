'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import DashboardInput from '@/components/lawyer/dashboard/DashboardInput';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, Globe, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function SocialMediaPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        websiteUrl: '',
        linkedinUrl: '',
        twitterUrl: '',
        youtubeUrl: '',
    });
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
                        websiteUrl: res.data.websiteUrl || '',
                        linkedinUrl: res.data.linkedinUrl || '',
                        twitterUrl: res.data.twitterUrl || '',
                        youtubeUrl: res.data.youtubeUrl || '',
                    });
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const res = await api.updateSocialMedia(formData);

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
        <DashboardLayout title="Step 5: Social Media">
            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 max-w-2xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">Social Presence</h2>
                    <p className="text-sm text-[#64748B]">Connect your professional social media accounts to build more trust with clients (Optional).</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold">
                        Social media links saved! Redirecting to overview...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <DashboardInput
                        label="Professional Website"
                        name="websiteUrl"
                        type="url"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        placeholder="https://www.yourfirm.com"
                        helperText="Link to your firm or personal professional portfolio."
                    />

                    <DashboardInput
                        label="LinkedIn Profile"
                        name="linkedinUrl"
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                    />

                    <DashboardInput
                        label="Twitter / X"
                        name="twitterUrl"
                        type="url"
                        value={formData.twitterUrl}
                        onChange={handleChange}
                        placeholder="https://twitter.com/username"
                    />

                    <DashboardInput
                        label="YouTube Channel"
                        name="youtubeUrl"
                        type="url"
                        value={formData.youtubeUrl}
                        onChange={handleChange}
                        placeholder="https://youtube.com/@channel"
                    />

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
                                    Save and Finish
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
