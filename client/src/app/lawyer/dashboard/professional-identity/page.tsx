'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import DashboardInput from '@/components/lawyer/dashboard/DashboardInput';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle } from 'lucide-react';

export default function ProfessionalIdentityPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullLegalName: '',
        title: '',
        registrationNumber: '',
        firmName: '',
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
                        fullLegalName: res.data.fullLegalName || '',
                        title: res.data.title || '',
                        registrationNumber: res.data.registrationNumber || '',
                        firmName: res.data.firmName || '',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSuccess(false);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const res = await api.updateProfessionalIdentity({
                fullLegalName: formData.fullLegalName,
                title: formData.title,
                registrationNumber: formData.registrationNumber,
                firmName: formData.firmName,
            });

            if (res.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/lawyer/dashboard/contact-information');
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
        <DashboardLayout title="Step 1: Professional Identity">
            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 max-w-2xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">Basic Information</h2>
                    <p className="text-sm text-[#64748B]">Provide your full legal name and professional credentials as they appear on your legal certificate.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold">
                        Profile saved successfully! Redirecting to next step...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <DashboardInput
                        label="Full Legal Name"
                        name="fullLegalName"
                        value={formData.fullLegalName}
                        onChange={handleChange}
                        placeholder="e.g. Jean Pierre Louis"
                        required
                        helperText="Include all middle names as per national ID."
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#1E3A5F]">Professional Title <span className="text-rose-500 ml-1">*</span></label>
                        <select
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all"
                        >
                            <option value="">Select Title</option>
                            <option value="BARRISTER">Barrister</option>
                            <option value="ATTORNEY">Attorney</option>
                            <option value="NOTARY">Notary</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <DashboardInput
                            label="Registration Number"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            placeholder="e.g. ABC 1234"
                            required
                        />
                        <DashboardInput
                            label="Firm Name (Optional)"
                            name="firmName"
                            value={formData.firmName}
                            onChange={handleChange}
                            placeholder="e.g. Apex Chambers"
                        />
                    </div>

                    <div className="pt-4">
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
