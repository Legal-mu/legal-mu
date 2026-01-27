'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterStep8() {
    const router = useRouter();
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedSubscription, setAcceptedSubscription] = useState(false);

    useEffect(() => {
        // Simple check for previous steps
        const step7Data = sessionStorage.getItem('registerStep7');
        if (!step7Data) {
            router.push('/register/step-7');
        }
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!acceptedTerms || !acceptedSubscription) {
            alert('Please accept the required agreements to continue.');
            return;
        }

        // Final submission logic
        const finalData = {
            step1: JSON.parse(sessionStorage.getItem('registerStep1') || '{}'),
            step2: JSON.parse(sessionStorage.getItem('registerStep2') || '{}'),
            step3: JSON.parse(sessionStorage.getItem('registerStep3') || '{}'),
            step4: JSON.parse(sessionStorage.getItem('registerStep4') || '{}'),
            step5: JSON.parse(sessionStorage.getItem('registerStep5') || '{}'),
            step6: JSON.parse(sessionStorage.getItem('registerStep6') || '{}'),
            step7: JSON.parse(sessionStorage.getItem('registerStep7') || '{}'),
            step8: { acceptedTerms, acceptedSubscription }
        };

        console.log('Final Registration Data:', finalData);
        alert('Registration Submitted Successfully! Your profile will be verified soon.');
        // router.push('/dashboard'); or success page
    };

    const handleBack = () => {
        router.push('/register/step-7');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: 'var(--font-jost)' }}>
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
            <div className="min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'rgba(190, 204, 255, 0.14)' }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
                    {/* Progress Bar - Only segment 8 is filled */}
                    <div className="flex gap-1 mb-8 max-w-[340px] mx-auto items-center justify-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                            <div
                                key={step}
                                className={`w-[40px] h-[6px] rounded-full transition-all duration-300 ${step === 8 ? 'bg-[#1A2853]' : 'bg-[#E2E8F0]'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-[612px_674px] overflow-hidden rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-[#E2E8F0] min-h-[670px] w-fit">

                        {/* Left Section - Premium Benefits (Navy) */}
                        <div className="bg-[#1A2853] p-12 text-white flex flex-col justify-center relative overflow-hidden">
                            {/* Decorative background circle */}
                            <div className="absolute top-[-10%] left-[-10%] w-[150px] h-[150px] bg-white/5 rounded-full blur-3xl"></div>

                            <div className="mb-10">
                                <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2.5 rounded-full text-[15px] font-bold mb-6 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                                    <img src="/diamond.svg" alt="Premium" className="w-4 h-4" />
                                    Premium Tier
                                </div>
                                <h1 className="text-[32px] font-bold leading-[1.1] mb-2">
                                    Unlock Your Full<br />Potential
                                </h1>
                                <p className="text-[17px] text-white/70 font-light leading-[1.3] max-w-[340px]">
                                    You're one step away from joining the top rated legal network of the country
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 border border-white/5" style={{ backgroundColor: 'rgba(214, 222, 249, 0.29)' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[17px] font-bold leading-tight">Verified Badge</h4>
                                        <p className="text-[14px] text-white/50 leading-tight mt-0.5">Standout with official verification.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 border border-white/5" style={{ backgroundColor: 'rgba(214, 222, 249, 0.29)' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[17px] font-bold leading-tight">Client Analytics</h4>
                                        <p className="text-[14px] text-white/50 leading-tight mt-0.5">Rank higher in client searches.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 border border-white/5" style={{ backgroundColor: 'rgba(214, 222, 249, 0.29)' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                                            <path d="M3 3v18h18" />
                                            <path d="M18 17l-4-4-2 2-4-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[17px] font-bold leading-tight">Priority Visibility</h4>
                                        <p className="text-[14px] text-white/50 leading-tight mt-0.5">Track profile views and leads.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Finalize Registration (White) */}
                        <div className="p-12">
                            <p className="text-[#64748B] text-[14px] font-medium mb-1">Step 8 of 8</p>
                            <h2 className="text-[28px] font-bold text-[#0F172A] mb-2 leading-tight">Finalize Your Registration</h2>
                            <p className="text-[15px] text-[#64748B] mb-10 leading-relaxed">
                                Please review the required agreements below to activate your account.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Terms & Privacy */}
                                <div className="p-6 rounded-2xl border border-[#E2E8F0] relative" style={{ backgroundColor: 'rgba(200, 194, 194, 0.24)' }}>
                                    <label className="flex items-start gap-4 cursor-pointer">
                                        <div className="mt-1">
                                            <input
                                                type="checkbox"
                                                checked={acceptedTerms}
                                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-6 h-6 border-2 border-[#1A2853] rounded-md bg-white peer-checked:bg-[#1A2853] transition-all flex items-center justify-center">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`scale-0 transition-transform ${acceptedTerms ? 'scale-100' : ''}`}>
                                                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-bold text-[#0F172A] mb-1">Terms & Privacy</p>
                                            <p className="text-[13px] text-[#64748B] leading-[160%]">
                                                I agree to the <span className="font-semibold text-[#1E3A5F]">Terms & Conditions</span> and <span className="font-semibold text-[#1E3A5F]">Privacy Policy</span>. I confirm that all provided professional information is accurate and up to date.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Subscription */}
                                <div className="p-6 rounded-2xl border border-[#E2E8F0] relative" style={{ backgroundColor: 'rgba(200, 194, 194, 0.24)' }}>
                                    <label className="flex items-start gap-4 cursor-pointer">
                                        <div className="mt-1">
                                            <input
                                                type="checkbox"
                                                checked={acceptedSubscription}
                                                onChange={(e) => setAcceptedSubscription(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-6 h-6 border-2 border-[#1A2853] rounded-md bg-white peer-checked:bg-[#1A2853] transition-all flex items-center justify-center">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`scale-0 transition-transform ${acceptedSubscription ? 'scale-100' : ''}`}>
                                                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-bold text-[#0F172A] mb-1">Subscription Acknowledgement</p>
                                            <p className="text-[13px] text-[#64748B] leading-[160%]">
                                                I understand that a verified subscription is required to list my profile publicly. The base plan starts at <span className="font-semibold text-[#1E3A5F]">20$/month</span>, which can be cancelled at any time.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center gap-5 pt-6">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-8 py-4 border border-[#E2E8F0] rounded-xl text-[#0F172A] text-[15px] font-bold hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-95"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!acceptedTerms || !acceptedSubscription}
                                        className="flex-1 px-10 py-4 bg-[#1E3A5F] text-white rounded-xl font-bold text-[15px] flex items-center justify-center gap-3 hover:bg-[#23356D] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#1E3A5F]/20 active:scale-[0.98]"
                                    >
                                        Submit
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-10">
                        <p className="text-[13px] text-[#94A3B8] italic">
                            Your details will be verified before your profile goes live.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
