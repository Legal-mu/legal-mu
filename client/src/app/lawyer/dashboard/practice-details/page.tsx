'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import DashboardInput from '@/components/lawyer/dashboard/DashboardInput';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, Plus, X } from 'lucide-react';

const PREDEFINED_PRACTICE_AREAS = [
    'Family Law', 'Criminal Law', 'Corporate Law', 'Real Estate',
    'Civil Litigation', 'Personal Injury', 'Employment Law',
    'Intellectual Property', 'Immigration Law', 'Taxation',
    'Commercial Law', 'Maritime Law', 'Constitutional Law'
];

const PREDEFINED_LANGUAGES = [
    'English', 'French', 'Mauritian Creole', 'Hindi', 'Mandarin', 'Tamil', 'Bhojpuri'
];

export default function PracticeDetailsPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        practiceAreas: [] as string[],
        admissionYear: '',
        experienceYears: '',
        languages: [] as string[],
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
                        practiceAreas: res.data.practiceAreas || [],
                        admissionYear: res.data.admissionYear?.toString() || '',
                        experienceYears: res.data.experienceYears?.toString() || '',
                        languages: res.data.languages || [],
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

    const toggleItem = (listName: 'practiceAreas' | 'languages', item: string) => {
        const list = [...formData[listName]];
        const index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        } else {
            if (listName === 'languages' && list.length >= 10) return;
            list.push(item);
        }
        setFormData({ ...formData, [listName]: list });
        setSuccess(false);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.practiceAreas.length === 0) {
            setError('Please select at least one practice area.');
            return;
        }

        if (formData.languages.length === 0) {
            setError('Please select at least one language.');
            return;
        }

        setSaving(true);
        setError('');

        try {
            const res = await api.updatePracticeDetails({
                practiceAreas: formData.practiceAreas,
                admissionYear: parseInt(formData.admissionYear),
                experienceYears: parseInt(formData.experienceYears),
                languages: formData.languages,
            });

            if (res.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/lawyer/dashboard/biography');
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
        <DashboardLayout title="Step 3: Practice Details">
            <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 max-w-2xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">Legal Expertise</h2>
                    <p className="text-sm text-[#64748B]">Highlight your areas of expertise, experience, and language skills.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold">
                        Practice details saved! Redirecting to next step...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Practice Areas */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-bold text-[#1E3A5F]">Areas of Practice <span className="text-rose-500 ml-1">*</span></label>
                            <p className="text-xs text-slate-400 mt-1">Select the legal areas you specialize in.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {PREDEFINED_PRACTICE_AREAS.map((area) => {
                                const isSelected = formData.practiceAreas.includes(area);
                                return (
                                    <button
                                        key={area}
                                        type="button"
                                        onClick={() => toggleItem('practiceAreas', area)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${isSelected
                                                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                                                : 'bg-white text-[#64748B] border-slate-200 hover:border-[#1E3A5F]/40'
                                            }`}
                                    >
                                        {area}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Admission & Experience */}
                    <div className="grid grid-cols-2 gap-4">
                        <DashboardInput
                            label="Year of Admission"
                            name="admissionYear"
                            type="number"
                            min="1950"
                            max={new Date().getFullYear()}
                            value={formData.admissionYear}
                            onChange={handleChange}
                            placeholder="e.g. 2015"
                            required
                        />
                        <DashboardInput
                            label="Years of Experience"
                            name="experienceYears"
                            type="number"
                            min="0"
                            value={formData.experienceYears}
                            onChange={handleChange}
                            placeholder="e.g. 8"
                            required
                        />
                    </div>

                    {/* Languages */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-bold text-[#1E3A5F]">Languages Spoken <span className="text-rose-500 ml-1">*</span></label>
                            <p className="text-xs text-slate-400 mt-1">Select the languages you can professionally consult in (max 10).</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {PREDEFINED_LANGUAGES.map((lang) => {
                                const isSelected = formData.languages.includes(lang);
                                return (
                                    <button
                                        key={lang}
                                        type="button"
                                        onClick={() => toggleItem('languages', lang)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${isSelected
                                                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                                                : 'bg-white text-[#64748B] border-slate-200 hover:border-[#1E3A5F]/40'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                );
                            })}
                        </div>
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
