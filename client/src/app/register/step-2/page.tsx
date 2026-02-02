'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PROFESSIONAL_TITLES = [
    { value: 'attorney', label: 'Attorney' },
    { value: 'barrister', label: 'Barrister' },
    { value: 'solicitor', label: 'Solicitor' },
    { value: 'advocate', label: 'Advocate' },
];

export default function RegisterStep2() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullLegalName: '',
        professionalTitle: '',
        barRegistrationNumber: '',
        firmName: '',
        legalEntityName: '',
    });

    useEffect(() => {
        const step1Data = sessionStorage.getItem('registerStep1');
        if (!step1Data) {
            router.push('/register');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBack = () => {
        router.push('/register');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sessionStorage.setItem('registerStep2', JSON.stringify(formData));
        router.push('/register/step-3');
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-jost)' }}>
            {/* Header */}
            <nav className="bg-white px-4 md:px-8 py-5 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <img
                        src="/logo.svg"
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
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Left Section - Form */}
                    <div className="bg-white p-10 rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                        {/* Progress Bar - 8 segments, only step 2 (current) is filled */}
                        <div className="flex gap-1 mb-8">
                            <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            <div className="flex-1 h-[4px] rounded-full bg-[#1E3A5F]" />
                            <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                        </div>

                        <p className="text-[#64748B] text-[13px] italic mb-1">Step 2 of 8</p>
                        <h2 className="text-[22px] font-bold text-[#0F172A] mb-2">Professional Identity</h2>
                        <p className="text-[#64748B] text-[14px] leading-[1.6] mb-8">
                            Please provide your official practicing details. This information will be verified against bar council records.
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* Full Legal Name */}
                            <div className="mb-6">
                                <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                    Full Legal Name<span className="text-[#EF4444] ml-0.5">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullLegalName"
                                    placeholder="Hanifa Ibrahim"
                                    value={formData.fullLegalName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9]"
                                    required
                                />
                            </div>

                            {/* Professional Title & Bar Registration */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                        Professional Title
                                    </label>
                                    <select
                                        name="professionalTitle"
                                        value={formData.professionalTitle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-transparent rounded-full text-[14px] text-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9] appearance-none cursor-pointer"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 16px center'
                                        }}
                                    >
                                        <option value="" className="text-[#64748B]">Select your title</option>
                                        {PROFESSIONAL_TITLES.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                        Bar Registration Number
                                    </label>
                                    <input
                                        type="text"
                                        name="barRegistrationNumber"
                                        placeholder="eg 12345"
                                        value={formData.barRegistrationNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9]"
                                    />
                                </div>
                            </div>

                            {/* Firm/Chambers Name */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[14px] font-bold text-[#1E3A5F]">
                                        Firm/Chambers Name
                                    </label>
                                    <span className="text-[12px] text-[#94A3B8]">Optional</span>
                                </div>
                                <input
                                    type="text"
                                    name="firmName"
                                    placeholder="eg LegalMU Chambers"
                                    value={formData.firmName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9]"
                                />
                            </div>

                            {/* Legal Entity Name */}
                            <div className="border border-[#E2E8F0] bg-[#F1F5F9] rounded-xl p-4 mb-8">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[14px] font-bold text-[#1E3A5F]">
                                        Legal Entity Name
                                    </label>
                                    <span className="bg-[#1E3A5F] text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                        If Applicable
                                    </span>
                                </div>
                                <p className="text-[12px] text-[#64748B] mb-3">
                                    If you&apos;re registering as a legal entity please provide the registered name.
                                </p>
                                <input
                                    type="text"
                                    name="legalEntityName"
                                    placeholder="eg Umair & Associates LTD"
                                    value={formData.legalEntityName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-white"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-between">
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
                                    className="px-8 py-3 bg-[#1E3A5F] text-white rounded-full font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#2D4A6F] transition-colors"
                                >
                                    Continue
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Section - Blue Panel with Testimonial + Benefits below */}
                    <div className="flex flex-col gap-8">
                        {/* Light Blue Background Panel */}
                        <div className="bg-[#F1F5F9] rounded-2xl p-8 min-h-[550px] flex items-center justify-center">
                            {/* Testimonial Card */}
                            <div className="bg-white p-5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                {/* Stars */}
                                <div className="flex gap-0 mb-3 text-[14px]">
                                    <span className="text-[#1E3A5F]">★</span>
                                    <span className="text-[#1E3A5F]">★</span>
                                    <span className="text-[#1E3A5F]">★</span>
                                    <span className="text-slate-300">☆</span>
                                </div>

                                {/* Quote */}
                                <p className="text-[13px] text-[#64748B] leading-[1.6] mb-4">
                                    "Joining Legal.MU transformed my practice. The verification process is thorough, which builds instant trust with prospective clients looking for specialized counsel."
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-semibold text-[#0F172A]">Sheila Toofaan</div>
                                        <div className="text-[10px] text-[#94A3B8]">Senior lawyer</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits - Outside the blue panel */}
                        <div className="px-2">
                            <h3 className="text-[16px] font-bold text-[#1E3A5F] mb-3">Why Join Legal.mu?</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <img src="/tick.svg" alt="Check" className="w-4 h-4" />
                                    <span className="text-[13px] text-[#64748B]">Get a verified badge</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src="/tick.svg" alt="Check" className="w-4 h-4" />
                                    <span className="text-[13px] text-[#64748B]">Increase client visibility</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="4" y="4" width="16" height="16" rx="2" />
                                        <path d="M9 9h6M9 13h6M9 17h4" />
                                    </svg>
                                    <span className="text-[13px] text-[#64748B]">Access legal resource hub</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
