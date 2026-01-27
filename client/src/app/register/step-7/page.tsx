'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterStep7() {
    const router = useRouter();
    const [socials, setSocials] = useState({
        linkedin: '',
        twitter: '',
        facebook: '',
        youtube: '',
    });
    const [endorsements, setEndorsements] = useState<string[]>([]);

    useEffect(() => {
        const savedData = sessionStorage.getItem('registerStep7');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.socials) setSocials(parsed.socials);
            if (parsed.endorsements) setEndorsements(parsed.endorsements);
        }
    }, []);

    const toggleEndorsement = (id: string) => {
        setEndorsements(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const handleSocialChange = (platform: string, value: string) => {
        setSocials(prev => ({ ...prev, [platform]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSave = {
            socials,
            endorsements,
        };
        sessionStorage.setItem('registerStep7', JSON.stringify(dataToSave));
        router.push('/register/step-8');
    };

    const handleBack = () => {
        router.push('/register/step-6');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <nav className="bg-white px-4 md:px-8 py-5 flex justify-between items-center border-b border-[#E2E8F0]">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/images/legalmu-logo.png"
                        alt="LEGAL.MU - Access to justice"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Already have an account? Login */}
                <div className="flex items-center gap-2 text-[14px]">
                    <span className="text-[#64748B]">Already have an account?</span>
                    <Link
                        href="/login"
                        className="text-[#1E3A5F] font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-[calc(100vh-80px)]">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
                    <div className="grid lg:grid-cols-[340px_1fr] gap-16     items-start">

                        {/* Left Section - Showcase Panel */}
                        <div className="lg:sticky lg:top-12 flex items-center min-h-[calc(100vh-400px)]">
                            <div className="py-12 px-10 rounded-[24px]" style={{ backgroundColor: 'rgba(246, 248, 255, 1)' }}>
                                <h3 className="mb-6" style={{
                                    fontFamily: 'var(--font-jost)',
                                    fontSize: '40px',
                                    fontWeight: 700,
                                    lineHeight: '130%',
                                    color: 'rgba(26, 40, 83, 1)',
                                    fontStyle: 'normal'
                                }}>
                                    Build Your<br />Digital<br />Reputation.
                                </h3>
                                <p style={{
                                    fontFamily: 'Jost',
                                    fontSize: '20px',
                                    fontWeight: 300,
                                    lineHeight: '140%',
                                    color: 'rgba(0, 0, 0, 1)',
                                    fontStyle: 'normal'
                                }}>
                                    Connecting your social profiles and<br />
                                    verifying your memberships helps build<br />
                                    immediate trust with prospective clients.
                                </p>
                            </div>
                        </div>

                        {/* Right Section - Form */}
                        <div className="bg-white px-16 py-12 rounded-[20px] border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            {/* Progress Bar - Figma Specs: 511px width, 7px height, 1px gap */}
                            <div className="flex gap-[1px] mb-8 w-[511px] mx-auto px-[2px]">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                                    <div
                                        key={step}
                                        className={`flex-1 h-[7px] rounded-full transition-all duration-300 ${step === 7 ? 'bg-[#1A2853]' : 'bg-[#E2E8F0]'
                                            }`}
                                    />
                                ))}
                            </div>

                            <p style={{
                                fontFamily: 'Jost',
                                fontWeight: 700,
                                fontSize: '18px',
                                lineHeight: '100%',
                                color: 'rgba(26, 40, 83, 1)',
                                fontStyle: 'normal',
                                marginBottom: '8px'
                            }}>
                                Step 7 of 8
                            </p>
                            <h2 style={{
                                fontFamily: 'Jost',
                                fontWeight: 700,
                                fontSize: '28px',
                                lineHeight: '100%',
                                color: 'rgba(0, 0, 0, 1)',
                                fontStyle: 'normal',
                                marginBottom: '8px'
                            }}>
                                Socials & Endorsements
                            </h2>
                            <p style={{
                                fontFamily: 'Jost',
                                fontWeight: 400,
                                fontSize: '15px',
                                lineHeight: '100%',
                                color: 'rgba(135, 134, 134, 1)',
                                fontStyle: 'normal',
                                marginBottom: '32px'
                            }}>
                                Enhance your profile visibility by linking your social accounts and verifying your professional standing.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Social Presence Section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-5">
                                        <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#1A2853] flex items-center justify-center">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="18" cy="5" r="3" />
                                                <circle cx="6" cy="12" r="3" />
                                                <circle cx="18" cy="19" r="3" />
                                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                            </svg>
                                        </div>
                                        <h3 style={{
                                            fontFamily: 'Jost',
                                            fontWeight: 600,
                                            fontSize: '20px',
                                            lineHeight: '100%',
                                            color: 'rgba(26, 40, 83, 1)',
                                            fontStyle: 'normal'
                                        }}>
                                            Social Presence
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* LinkedIn */}
                                        <div className="space-y-2">
                                            <label className="text-[14px] font-semibold text-[#1A2853]">LinkedIn</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#0077B5]">
                                                        <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    value={socials.linkedin}
                                                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px] text-[#64748B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* X */}
                                        <div className="space-y-2">
                                            <label className="text-[14px] font-semibold text-[#1A2853]">Twitter (X)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    value={socials.twitter}
                                                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px] text-[#64748B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Facebook */}
                                        <div className="space-y-2">
                                            <label className="text-[14px] font-semibold text-[#1A2853]">Facebook</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                                                        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7h-2.54v-2.9h2.54V9.82c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    value={socials.facebook}
                                                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px] text-[#64748B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Youtube */}
                                        <div className="space-y-2">
                                            <label className="text-[14px] font-semibold text-[#1A2853]">Youtube</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
                                                        <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41a2.5 2.5 0 0 0-1.77 1.78C2 8.75 2 12 2 12s0 3.25.41 4.81c.23.86.91 1.54 1.77 1.78 1.56.41 7.81.41 7.81.41s6.25 0 7.81-.41a2.5 2.5 0 0 0 1.77-1.78c.41-1.56.41-4.81.41-4.81s0-3.25-.41-4.81zM10 15V9l5.2 3L10 15z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    value={socials.youtube}
                                                    onChange={(e) => handleSocialChange('youtube', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[14px] text-[#64748B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Official Endorsements Section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#1A2853] flex items-center justify-center">
                                            <img src="/tick.svg" alt="Verified Seal" className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-[16px] font-bold text-[#1A2853]">Official Endorsements</h3>
                                    </div>
                                    <p className="text-[14px] text-[#64748B] mb-5">
                                        Select the legal bodies where you hold an active, verified membership.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Bar Council */}
                                        <div
                                            onClick={() => toggleEndorsement('bar-council')}
                                            className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 flex flex-col items-center text-center ${endorsements.includes('bar-council')
                                                ? 'border-[#1A2853] bg-white shadow-md'
                                                : 'border-dashed border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                                                }`}
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-[#D6DEF9] text-[#223D9C]">
                                                <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px]">
                                                    <path d="M0.5 16.6753H10.1429M8.85714 16.6753V13.461H1.78571V16.6753M9.869 0.87644L5.25971 5.48573C5.01868 5.72683 4.88327 6.0538 4.88327 6.39473C4.88327 6.73565 5.01868 7.06262 5.25971 7.30373L7.29629 9.3403C7.53739 9.58133 7.86436 9.71674 8.20529 9.71674C8.54621 9.71674 8.87318 9.58133 9.11429 9.3403L13.7236 4.73101C13.9646 4.4899 14.1 4.16294 14.1 3.82201C14.1 3.48109 13.9646 3.15412 13.7236 2.91301L11.6857 0.87644C11.4446 0.635405 11.1176 0.5 10.7767 0.5C10.4358 0.5 10.1088 0.635405 9.86771 0.87644M11.4286 7.03244L17.2143 12.8182" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" />
                                                </svg>
                                            </div>
                                            <p className="text-[14px] font-semibold text-[#0F172A] mb-0.5">Bar Council</p>
                                            <p className="text-[11px] text-[#94A3B8]">Active Membership</p>
                                        </div>

                                        {/* Law Society */}
                                        <div
                                            onClick={() => toggleEndorsement('law-society')}
                                            className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 flex flex-col items-center text-center ${endorsements.includes('law-society')
                                                ? 'border-[#1A2853] bg-white shadow-md'
                                                : 'border-dashed border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                                                }`}
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-[#D6DEF9] text-[#223D9C]">
                                                <svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px]">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.89298 1.7375C8.09866 1.81042 8.27968 1.93458 8.42057 2.09542L11.7609 1.26292C11.82 1.24787 11.8816 1.24589 11.9416 1.25712C12.0015 1.26835 12.0583 1.29251 12.1079 1.32792C12.1552 1.36153 12.194 1.40347 12.2241 1.45375L14.1865 4.58333H15V4.58458C15 4.87208 14.9657 5.15083 14.9013 5.41667C14.5531 6.85417 13.3253 7.91667 11.8645 7.91667C10.4038 7.91667 9.176 6.85417 8.82776 5.41667C8.76186 5.14377 8.72874 4.86403 8.7291 4.58333H9.34532L10.8942 2.33792L8.72868 2.8775L8.7291 2.91667C8.72923 3.17527 8.64889 3.42755 8.49914 3.63874C8.34939 3.84993 8.13761 4.00963 7.89298 4.09583V13.3333H9.14716V14.1667H11.6555V15H3.29432V14.1667H5.80268V13.3333H7.05686V4.09583C6.78331 3.99934 6.55179 3.8113 6.40176 3.56375L3.95778 4.21333L5.88002 7.17417H6.2709V7.17542C6.27117 7.45569 6.23805 7.73501 6.17224 8.0075C5.824 9.445 4.59616 10.5075 3.13545 10.5075C1.67475 10.5075 0.446909 9.445 0.0986651 8.0075C0.0327608 7.7346 -0.000359039 7.45486 2.93511e-06 7.17417H0.50502L2.95276 3.71792C3.00927 3.63807 3.09213 3.58055 3.18688 3.55542L6.23244 2.74625C6.26378 2.51896 6.35728 2.30465 6.50269 2.12679C6.64811 1.94894 6.83983 1.8144 7.05686 1.73792V0H7.89298V1.7375ZM13.2007 4.58333L11.8478 2.42625L10.36 4.58333H13.2007ZM4.8842 7.17417L3.27927 4.70208L1.52843 7.17417H4.8842ZM14.0343 5.41667C13.7124 6.41042 12.8328 7.08333 11.8645 7.08333C10.8963 7.08333 10.0167 6.41042 9.69482 5.41667H14.0343ZM5.30519 8.0075C4.98328 9.00125 4.10368 9.67417 3.13545 9.67417C2.16723 9.67417 1.28763 9.00125 0.965722 8.0075H5.30519ZM7.47492 3.33333C7.58579 3.33333 7.69213 3.28943 7.77053 3.21129C7.84893 3.13315 7.89298 3.02717 7.89298 2.91667C7.89298 2.80616 7.84893 2.70018 7.77053 2.62204C7.69213 2.5439 7.58579 2.5 7.47492 2.5C7.36404 2.5 7.25771 2.5439 7.1793 2.62204C7.1009 2.70018 7.05686 2.80616 7.05686 2.91667C7.05686 3.02717 7.1009 3.13315 7.1793 3.21129C7.25771 3.28943 7.36404 3.33333 7.47492 3.33333Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <p className="text-[14px] font-semibold text-[#0F172A] mb-0.5">Law Society</p>
                                            <p className="text-[11px] text-[#94A3B8]">Certified Member</p>
                                        </div>

                                        {/* Notaries Chamber */}
                                        <div
                                            onClick={() => toggleEndorsement('notaries-chamber')}
                                            className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 flex flex-col items-center text-center ${endorsements.includes('notaries-chamber')
                                                ? 'border-[#1A2853] bg-white shadow-md'
                                                : 'border-dashed border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                                                }`}
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-[#D6DEF9] text-[#223D9C]">
                                                <svg width="22" height="22" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px]">
                                                    <path d="M11.3475 6.63158L12.2925 5.70316C12.6225 5.37895 13.0425 5.20211 13.5 5.15789V4.42105L9 0H1.5C0.6675 0 0 0.655789 0 1.47368V11.7895C0 12.1803 0.158035 12.5552 0.43934 12.8315C0.720644 13.1079 1.10218 13.2632 1.5 13.2632H6V11.8853L6.0975 11.7895H1.5V1.47368H6.75V6.63158H11.3475ZM8.25 1.10526L12.375 5.15789H8.25V1.10526ZM12.0975 7.98L13.6275 9.48316L9.03 14H7.5V12.4968L12.0975 7.98ZM14.8875 8.24526L14.1525 8.96737L12.6225 7.46421L13.3575 6.74211C13.5 6.59474 13.7475 6.59474 13.8975 6.74211L14.8875 7.71474C15.0375 7.86211 15.0375 8.10526 14.8875 8.24526Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <p className="text-[14px] font-semibold text-[#0F172A] mb-0.5">Notaries Chamber</p>
                                            <p className="text-[11px] text-[#94A3B8]">Registered Notary</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 border border-[#E2E8F0] rounded-full text-[#0F172A] text-[14px] font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-8 py-3 bg-[#1E3A5F] text-white rounded-full font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-[#2D4A6F] transition-colors"
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
                    <div className="text-center mt-10">
                        <p className="text-[13px] text-[#94A3B8]">
                            Your details will be verified before your profile goes live.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
