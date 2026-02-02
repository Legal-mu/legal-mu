'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import DashboardInput from '@/components/lawyer/dashboard/DashboardInput';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, Plus, X, FileUp, Briefcase as BriefcaseIcon } from 'lucide-react';
import { WorkExperience } from '@/types';

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
        workExperience: [{ role: '', firm: '', years: '' }] as WorkExperience[],
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvUrl, setCvUrl] = useState('');
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
                        workExperience: (res.data.workExperience && res.data.workExperience.length > 0)
                            ? res.data.workExperience
                            : [{ role: '', firm: '', years: '' }],
                    });
                    setCvUrl(res.data.cvUrl || '');
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

    const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: string) => {
        const updated = [...formData.workExperience];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, workExperience: updated });
    };

    const addWorkExperience = () => {
        setFormData({
            ...formData,
            workExperience: [...formData.workExperience, { role: '', firm: '', years: '' }]
        });
    };

    const removeWorkExperience = (index: number) => {
        const updated = [...formData.workExperience];
        updated.splice(index, 1);
        setFormData({ ...formData, workExperience: updated });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvFile(e.target.files[0]);
            setSuccess(false);
            setError('');
        }
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
            const data = new FormData();

            // Wait, my backend updatePracticeDetails uses req.body for everything except file.
            // In multipart, arrays are often sent as multiple entries with same key or stringified JSON.
            // Let's check backend lawyerProfileController.ts updatePracticeDetails.

            data.append('practiceAreas', JSON.stringify(formData.practiceAreas));
            data.append('admissionYear', formData.admissionYear);
            data.append('experienceYears', formData.experienceYears);
            data.append('languages', JSON.stringify(formData.languages));
            data.append('workExperience', JSON.stringify(formData.workExperience));
            if (cvFile) {
                data.append('cv', cvFile);
            }

            const res = await api.updatePracticeDetails(data);

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

                    {/* Work Experience Timeline */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-bold text-[#1E3A5F]">Work Experience Timeline <span className="text-rose-500 ml-1">*</span></label>
                                <p className="text-xs text-slate-400 mt-1">Add your previous roles and firms.</p>
                            </div>
                            <button
                                type="button"
                                onClick={addWorkExperience}
                                className="flex items-center gap-1 text-xs font-bold text-[#1E3A5F] hover:text-[#2D4A6F] transition-colors"
                            >
                                <Plus size={14} /> Add More
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.workExperience.map((work, index) => (
                                <div key={index} className="flex gap-3 items-start animate-in fade-in slide-in-from-top-1 duration-200">
                                    <div className="grid grid-cols-3 gap-3 flex-1">
                                        <input
                                            type="text"
                                            placeholder="Role (e.g. Associate)"
                                            value={work.role}
                                            onChange={(e) => handleWorkExperienceChange(index, 'role', e.target.value)}
                                            required
                                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] transition-all"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Firm/Chambers"
                                            value={work.firm}
                                            onChange={(e) => handleWorkExperienceChange(index, 'firm', e.target.value)}
                                            required
                                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] transition-all"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Year (e.g. 2020 - 2022)"
                                            value={work.years}
                                            onChange={(e) => handleWorkExperienceChange(index, 'years', e.target.value)}
                                            required
                                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] transition-all"
                                        />
                                    </div>
                                    {formData.workExperience.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeWorkExperience(index)}
                                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CV Upload */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-bold text-[#1E3A5F]">Full CV / Firm Brochure <span className="text-rose-500 ml-1">*</span></label>
                            <p className="text-xs text-slate-400 mt-1">Upload a PDF of your professional CV or firm profile.</p>
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                id="cv-upload"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="cv-upload"
                                className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-[20px] cursor-pointer transition-all ${cvFile || cvUrl
                                    ? 'bg-emerald-50/30 border-emerald-200 text-emerald-700'
                                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:border-slate-300'
                                    }`}
                            >
                                <div className={`p-3 rounded-full ${cvFile || cvUrl ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400 shadow-sm'}`}>
                                    <FileUp size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-sm">
                                        {cvFile ? cvFile.name : (cvUrl ? 'CV Uploaded' : 'Click to upload CV')}
                                    </p>
                                    <p className="text-xs opacity-70 mt-1">PDF, DOCX up to 5MB</p>
                                </div>
                            </label>
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
