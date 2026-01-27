'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const practiceAreas = [
    'Civil Litigation',
    'Corporate & Commercial',
    'Criminal Law',
    'Family & matrimonial',
    'Employement & Labour',
    'Real Estate and Property',
    'Intellectual Property',
    'Banking & Finance',
];

const jurisdictions = [
    'Supreme Court',
    'Intermediate Court',
    'District Court',
    'Industrial Court',
    'Rodrigues',
];

const languages = [
    'English',
    'Hindi',
    'Creole',
    'Urdu',
    'French',
    'Mandarin',
];

export default function RegisterStep4() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        areasOfPractice: [] as string[],
        yearsOfExperience: '',
        jurisdictions: [] as string[],
        languages: [] as string[],
    });

    useEffect(() => {
        const step1Data = sessionStorage.getItem('registerStep1');
        const step2Data = sessionStorage.getItem('registerStep2');
        const step3Data = sessionStorage.getItem('registerStep3');
        if (!step1Data || !step2Data || !step3Data) {
            router.push('/register');
        }
    }, [router]);

    const handleCheckboxChange = (field: 'areasOfPractice' | 'jurisdictions' | 'languages', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const handleBack = () => {
        router.push('/register/step-3');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sessionStorage.setItem('registerStep4', JSON.stringify(formData));
        router.push('/register/step-5');
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-jost)' }}>
            {/* Header */}
            <nav className="bg-white px-4 md:px-8 py-5 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <img
                        src="/images/legalmu-logo.png"
                        alt="LEGAL.MU - Access to justice"
                        className="h-10 w-auto"
                    />
                </Link>

                <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#64748B]">Already have an account?</span>
                    <Link href="/login" className="text-[14px] font-semibold text-[#0F172A] hover:underline">
                        Login
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'rgba(190, 204, 255, 0.14)' }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
                    <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">

                        {/* Left Section - Expertise Matters Panel */}
                        <div className="lg:sticky lg:top-0 -ml-6 md:-ml-12">
                            <div className="bg-[#F1F5F9] p-8 pr-12 min-h-[calc(100vh-80px)] flex items-center">
                                <div className="text-left">
                                    <h3 className="text-[48px] font-bold text-[#1A2853] leading-[100%] mb-6">
                                        Expertise<br />Matters.
                                    </h3>
                                    <p className="text-[28px] font-light text-black leading-[150%]">
                                        By detailing your<br />
                                        practice areas<br />
                                        and jurisdications,you<br />
                                        ensure<br />
                                        clients with specific<br />
                                        legal needs<br />
                                        can find you instantly
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Form */}
                        <div className="bg-white p-10 rounded-[20px] border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            {/* Progress Bar - 8 segments, only step 4 (current) is filled */}
                            <div className="flex gap-1 mb-8">
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#1E3A5F]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            </div>

                            <p className="text-[#64748B] text-[13px] italic mb-1">Step 4 of 8</p>
                            <h2 className="text-[22px] font-bold text-[#0F172A] mb-2">Practice Details</h2>
                            <p className="text-[#64748B] text-[14px] leading-[1.6] mb-8">
                                Select your areas of expertise & jurisdiction to help clients find the right legal help.
                            </p>

                            <form onSubmit={handleSubmit}>
                                {/* Areas of Practice */}
                                <div className="mb-6">
                                    <label className="block text-[17px] font-bold text-[#1E3A5F] mb-3">
                                        Areas of Practice <span className="text-[#64748B] font-normal text-[12px]">(Multiselect)</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {practiceAreas.map((area) => (
                                            <label
                                                key={area}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${formData.areasOfPractice.includes(area)
                                                    ? 'border-[#1E3A5F] bg-[#F8FAFC]'
                                                    : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.areasOfPractice.includes(area)}
                                                    onChange={() => handleCheckboxChange('areasOfPractice', area)}
                                                    className="w-4 h-4 rounded border-[#E2E8F0] text-[#1E3A5F] focus:ring-[#1E3A5F]"
                                                />
                                                <span className="text-[14px] text-[#0F172A]">{area}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Years of Experience */}
                                <div className="mb-6">
                                    <label className="block text-[17px] font-bold text-[#1E3A5F] mb-2">
                                        Years of Experience
                                    </label>
                                    <select
                                        value={formData.yearsOfExperience}
                                        onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-[14px] text-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-white appearance-none cursor-pointer"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 16px center'
                                        }}
                                    >
                                        <option value="">Select your experience level</option>
                                        <option value="0-2">0-2 years</option>
                                        <option value="3-5">3-5 years</option>
                                        <option value="6-10">6-10 years</option>
                                        <option value="11-15">11-15 years</option>
                                        <option value="15+">15+ years</option>
                                    </select>
                                </div>

                                {/* Jurisdictions of Practice */}
                                <div className="mb-6">
                                    <label className="block text-[17px] font-bold text-[#1E3A5F] mb-3">
                                        Jurisdictions of Practice
                                    </label>
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                                        {jurisdictions.map((jurisdiction) => (
                                            <label
                                                key={jurisdiction}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.jurisdictions.includes(jurisdiction)}
                                                    onChange={() => handleCheckboxChange('jurisdictions', jurisdiction)}
                                                    className="w-4 h-4 rounded border-[#E2E8F0] text-[#1E3A5F] focus:ring-[#1E3A5F] accent-[#1E3A5F]"
                                                />
                                                <span className="text-[13px] text-[#0F172A]">{jurisdiction}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Languages Spoken */}
                                <div className="mb-8">
                                    <label className="block text-[17px] font-bold text-[#1E3A5F] mb-3">
                                        Languages Spoken
                                    </label>
                                    <div className="grid grid-cols-4 gap-x-6 gap-y-3">
                                        {languages.map((language) => (
                                            <label
                                                key={language}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.languages.includes(language)}
                                                    onChange={() => handleCheckboxChange('languages', language)}
                                                    className="w-4 h-4 rounded border-[#E2E8F0] text-[#1E3A5F] focus:ring-[#1E3A5F] accent-[#1E3A5F]"
                                                />
                                                <span className="text-[13px] text-[#0F172A]">{language}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 border border-[#E2E8F0] rounded-full text-[#0F172A] text-[14px] font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-8 py-3 bg-[#1E3A5F] text-white rounded-full font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#2D4A6F] transition-colors"
                                    >
                                        Continue
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-8">
                        <p className="text-[12px] text-[#94A3B8]">
                            Your details will be verified before your profile goes live.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
