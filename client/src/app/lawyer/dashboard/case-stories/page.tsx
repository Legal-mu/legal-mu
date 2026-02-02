'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import DashboardInput from '@/components/lawyer/dashboard/DashboardInput';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, Plus, X, MessageSquare } from 'lucide-react';
import { ClientTestimonial } from '@/types';

export default function CaseStoriesPage() {
    const router = useRouter();
    const [clientTestimonials, setClientTestimonials] = useState<ClientTestimonial[]>([
        { text: '', initials: '' }
    ]);
    const [featuredSuccessStories, setFeaturedSuccessStories] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.getLawyerProfile();
                if (res.success && res.data) {
                    if (res.data.clientTestimonials && res.data.clientTestimonials.length > 0) {
                        setClientTestimonials(res.data.clientTestimonials);
                    }
                    setFeaturedSuccessStories(res.data.featuredSuccessStories || '');
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleTestimonialChange = (index: number, field: keyof ClientTestimonial, value: string) => {
        const updated = [...clientTestimonials];
        updated[index] = { ...updated[index], [field]: value };
        setClientTestimonials(updated);
    };

    const addTestimonial = () => {
        if (clientTestimonials.length >= 3) return;
        setClientTestimonials([...clientTestimonials, { text: '', initials: '' }]);
    };

    const removeTestimonial = (index: number) => {
        const updated = [...clientTestimonials];
        updated.splice(index, 1);
        setClientTestimonials(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            // Filter out empty testimonials
            const validTestimonials = clientTestimonials.filter(t => t.text.trim() && t.initials.trim());

            const res = await api.updateCaseStories({
                clientTestimonials: validTestimonials,
                featuredSuccessStories: featuredSuccessStories
            });

            if (res.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/lawyer/dashboard/verification-tools');
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
        <DashboardLayout title="Step 6: Case Stories & Testimonials">
            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 max-w-2xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">Build Client Trust</h2>
                    <p className="text-sm text-[#64748B]">Share client feedback and your most impactful legal successes.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold">
                        Case stories saved! Redirecting to next step...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Client Testimonials */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-bold text-[#1E3A5F]">Client Testimonials</label>
                                <p className="text-xs text-slate-400 mt-1">Add up to 3 testimonials from satisfied clients.</p>
                            </div>
                            {clientTestimonials.length < 3 && (
                                <button
                                    type="button"
                                    onClick={addTestimonial}
                                    className="flex items-center gap-1 text-xs font-bold text-[#1E3A5F] hover:text-[#2D4A6F] transition-colors"
                                >
                                    <Plus size={14} /> Add Testimonial
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {clientTestimonials.map((testimonial, index) => (
                                <div key={index} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl relative animate-in fade-in slide-in-from-top-1 duration-200">
                                    {clientTestimonials.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTestimonial(index)}
                                            className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[11px] font-bold text-[#64748B] uppercase">Testimonial Text</label>
                                            <textarea
                                                placeholder="e.g. 'Working with Adv. Louis was a game-changer for my business...'"
                                                value={testimonial.text}
                                                onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] transition-all resize-none"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 w-1/3">
                                            <label className="text-[11px] font-bold text-[#64748B] uppercase">Client Initials</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. J.P."
                                                value={testimonial.initials}
                                                onChange={(e) => handleTestimonialChange(index, 'initials', e.target.value)}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Success Story */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                        <label className="text-sm font-bold text-[#1E3A5F]">Featured Case Success Story</label>
                        <p className="text-xs text-slate-400">Briefly highlight a landmark case or achievement (Optional).</p>
                        <textarea
                            value={featuredSuccessStories}
                            onChange={(e) => setFeaturedSuccessStories(e.target.value)}
                            rows={5}
                            placeholder="e.g. 'Successfully defended a major real estate firm in a multi-million dollar dispute involving land rights...'"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all placeholder:text-slate-400 resize-none"
                        />
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
