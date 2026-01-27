'use client';

import { useState } from 'react';
import { ProfileLayout } from '@/components/profile';

export default function PracticeDetailsPage() {
    const [formData, setFormData] = useState({
        areasOfPractice: ['Corporate Law', 'Intellectual Property'],
        yearsOfExperience: '8-14 Years',
        jurisdictions: ['Supreme Court', 'Federal Court'],
        languages: ['English', 'French'],
    });

    const [newArea, setNewArea] = useState('');
    const [newLanguage, setNewLanguage] = useState('');

    const jurisdictionOptions = [
        { value: 'Supreme Court', label: 'Supreme Court' },
        { value: 'State Court', label: 'State Court' },
        { value: 'Federal Court', label: 'Federal Court' },
        { value: 'Intermediate Court', label: 'Intermediate Court' },
    ];

    const yearsOptions = [
        { value: '0-2 Years', label: '0-2 Years' },
        { value: '3-5 Years', label: '3-5 Years' },
        { value: '6-7 Years', label: '6-7 Years' },
        { value: '8-14 Years', label: '8-14 Years' },
        { value: '15+ Years', label: '15+ Years' },
    ];

    const handleRemoveArea = (area: string) => {
        setFormData({
            ...formData,
            areasOfPractice: formData.areasOfPractice.filter((a) => a !== area),
        });
    };

    const handleAddArea = () => {
        if (newArea && formData.areasOfPractice.length < 5) {
            setFormData({
                ...formData,
                areasOfPractice: [...formData.areasOfPractice, newArea],
            });
            setNewArea('');
        }
    };

    const handleRemoveLanguage = (lang: string) => {
        setFormData({
            ...formData,
            languages: formData.languages.filter((l) => l !== lang),
        });
    };

    const handleAddLanguage = () => {
        if (newLanguage) {
            setFormData({
                ...formData,
                languages: [...formData.languages, newLanguage],
            });
            setNewLanguage('');
        }
    };

    const handleJurisdictionToggle = (jurisdiction: string) => {
        if (formData.jurisdictions.includes(jurisdiction)) {
            setFormData({
                ...formData,
                jurisdictions: formData.jurisdictions.filter((j) => j !== jurisdiction),
            });
        } else {
            setFormData({
                ...formData,
                jurisdictions: [...formData.jurisdictions, jurisdiction],
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <ProfileLayout
            activeSection="practice"
            breadcrumb="Practice Details"
            title="Practice & Expertise"
            subtitle="Manage your areas of specialization and professional experience to help clients find you."
            profileCompletion={60}
        >
            {/* Form Card */}
            <div className="bg-white rounded-2xl px-12 py-10 w-full">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.5">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                    </div>
                    <h2 className="text-[#0F172A] text-xl font-semibold">Practice Details</h2>
                </div>

                <p className="text-[#64748B] text-sm mb-6">
                    These details define how you are matched with potential cases.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Areas of Practice */}
                    <div className="mb-6">
                        <label className="block text-[#0F172A] text-sm font-semibold mb-2">Areas of Practice</label>
                        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-[#E2E8F0] bg-[#F5F5F5] min-h-[48px]">
                            {formData.areasOfPractice.map((area) => (
                                <span
                                    key={area}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg text-sm text-[#0F172A] border border-[#E2E8F0]"
                                >
                                    {area}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveArea(area)}
                                        className="text-[#94A3B8] hover:text-[#64748B] ml-1"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={newArea}
                                onChange={(e) => setNewArea(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddArea())}
                                placeholder="Add another area..."
                                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-[#64748B] placeholder:text-[#94A3B8]"
                            />
                        </div>
                        <p className="text-[#94A3B8] text-xs mt-2">Select up to 5 areas of practice.</p>
                    </div>

                    {/* Years of Experience */}
                    <div className="mb-6">
                        <label className="block text-[#0F172A] text-sm font-semibold mb-2">Years of Experience</label>
                        <div className="relative">
                            <select
                                value={formData.yearsOfExperience}
                                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F5F5F5] text-[#64748B] text-sm appearance-none outline-none"
                            >
                                {yearsOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <svg
                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#94A3B8"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>

                    {/* Jurisdictions of Practice */}
                    <div className="mb-6">
                        <label className="block text-[#0F172A] text-sm font-semibold mb-3">Jurisdictions of Practice</label>
                        <div className="bg-[#F5F5F5] rounded-xl p-4">
                            <div className="grid grid-cols-2 gap-3">
                                {jurisdictionOptions.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <div
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${formData.jurisdictions.includes(option.value)
                                                ? 'bg-[#1E3A5F] border-[#1E3A5F]'
                                                : 'border-[#CBD5E1] bg-white'
                                                }`}
                                            onClick={() => handleJurisdictionToggle(option.value)}
                                        >
                                            {formData.jurisdictions.includes(option.value) && (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm text-[#0F172A]">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="flex items-center gap-2 text-[#1E3A5F] text-sm mt-3 hover:underline"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                                Add another jurisdiction
                            </button>
                        </div>
                    </div>

                    {/* Languages Spoken */}
                    <div className="mb-8">
                        <label className="block text-[#0F172A] text-sm font-semibold mb-2">Languages Spoken</label>
                        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-[#E2E8F0] bg-[#F5F5F5] min-h-[48px]">
                            {formData.languages.map((lang) => (
                                <span
                                    key={lang}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg text-sm text-[#0F172A] border border-[#E2E8F0]"
                                >
                                    {lang}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveLanguage(lang)}
                                        className="text-[#94A3B8] hover:text-[#64748B] ml-1"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={newLanguage}
                                onChange={(e) => setNewLanguage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
                                placeholder="Add another language..."
                                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-[#64748B] placeholder:text-[#94A3B8]"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-8 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] font-medium text-sm hover:bg-[#F8FAFC] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#1E3A5F] rounded-xl text-white font-medium text-sm hover:bg-[#2D4A6F] transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
}
