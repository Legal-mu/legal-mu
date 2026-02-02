'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import DashboardInput from '@/components/lawyer/dashboard/DashboardInput';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, MapPin, Phone } from 'lucide-react';

export default function ContactInformationPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postal_code: '',
        country: 'Mauritius',
        phoneNumber: '',
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
                        address: res.data.address || '',
                        city: res.data.city || '',
                        postal_code: res.data.postal_code || '',
                        country: res.data.country || 'Mauritius',
                        phoneNumber: res.data.phoneNumber || '',
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
            const res = await api.updateContactInformation(formData);

            if (res.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/lawyer/dashboard/practice-details');
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
        <DashboardLayout title="Step 2: Contact Information">
            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 max-w-2xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">Location & Contact</h2>
                    <p className="text-sm text-[#64748B]">Provide your professional contact details so clients can reach you or visit your office.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold">
                        Contact information saved! Redirecting to next step...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <DashboardInput
                        label="Professional Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="e.g. 1st Floor, Victoria House"
                        required
                        icon={MapPin}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <DashboardInput
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="e.g. Port Louis"
                            required
                        />
                        <DashboardInput
                            label="Postal Code (Optional)"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            placeholder="e.g. 11302"
                        />
                    </div>

                    <DashboardInput
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled
                        required
                        helperText="Currently limited to Mauritius."
                    />

                    <DashboardInput
                        label="Phone Number"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="e.g. +230 5123 4567"
                        required
                        icon={Phone}
                    />

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
