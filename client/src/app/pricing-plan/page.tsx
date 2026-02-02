'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PricingPlanPage() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <main className="min-h-screen bg-[#F6F8FF]">
            {/* Header - Same as Practice Area */}
            <header className="fixed w-full top-0 z-50 bg-[#F6F8FF] border-b border-gray-100">
                <div className="relative w-full px-20 py-8 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="Legal.mu Logo"
                                width={180}
                                height={50}
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Navigation Pill */}
                    <nav className="absolute left-1/2 top-1/2 transform -translate-x-[55%] -translate-y-1/2 hidden lg:flex items-center bg-white border border-[#1A2853]/20 rounded-full px-48 py-5 shadow-sm">
                        <div className="flex items-center gap-16">
                            <Link href="/" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                                Home
                            </Link>
                            <Link href="/lawyers" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                                Lawyers Directory
                            </Link>
                            <Link href="/community" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                                Community
                            </Link>
                            <Link href="/resources" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                                Resources
                            </Link>
                        </div>
                    </nav>

                    {/* Login/Signup */}
                    <Link
                        href="/login"
                        className="px-8 py-3.5 bg-[#1A2853] text-white rounded-lg text-base font-semibold hover:bg-[#2A3B73] transition-all shadow-sm"
                    >
                        Login/Signup
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <div className="pt-45 px-70">
                <h1 className="font-['Jost'] font-bold text-[56px] leading-[120%] uppercase tracking-wide">
                    <span className="text-[#111827]">CHOOSE THE </span>
                    <span className="text-[#1A2853]">PLAN</span>
                    <br />
                    <span className="text-[#111827]">THAT FITS YOUR</span>
                    <br />
                    <span className="text-[#111827]">PRACTICE</span>
                </h1>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mt-12">
                <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-2 shadow-sm">
                    <button
                        onClick={() => setBillingPeriod('monthly')}
                        className={`px-6 py-3 rounded-full text-sm font-medium font-['Jost'] transition-all ${billingPeriod === 'monthly'
                            ? 'bg-[#1A2853] text-white'
                            : 'text-[#64748B] hover:text-[#1A2853]'
                            }`}
                    >
                        Pay Monthly
                    </button>
                    <button
                        onClick={() => setBillingPeriod('yearly')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium font-['Jost'] transition-all ${billingPeriod === 'yearly'
                            ? 'bg-[#1A2853] text-white'
                            : 'text-[#64748B] hover:text-[#1A2853]'
                            }`}
                    >
                        Pay Yearly
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="flex justify-center items-center gap-12 mt-35 px-20 pb-24">
                {/* Basic Plan */}
                <div className="bg-white rounded-3xl py-12 px-10 w-[320px] min-h-[480px] shadow-sm border border-gray-100">
                    <h3 className="font-['Jost'] font-bold text-[20px] text-[#1A2853] uppercase tracking-wider mb-5">
                        Basic
                    </h3>
                    <p className="font-['Jost'] text-[16px] text-[#64748B] leading-relaxed mb-8">
                        Essential tools for individual lawyers starting their digital journey
                    </p>
                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="font-['Jost'] font-bold text-[48px] text-[#1A2853]">20$</span>
                        <span className="font-['Jost'] text-[18px] text-[#64748B]">/month</span>
                    </div>
                    <Link href="/pricing-plan/details" className="block w-full py-4 rounded-full border border-gray-300 font-['Jost'] font-medium text-[16px] text-[#1A2853] hover:bg-gray-50 transition-all mb-10 text-center">
                        Select Plan
                    </Link>
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#64748B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Standard case management</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#64748B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Basic document storage</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#64748B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Email Integration</span>
                        </div>
                    </div>
                </div>

                {/* Superior Plan (Featured) */}
                <div className="bg-white rounded-3xl py-18 px-14 w-[420px] min-h-[700px] shadow-xl border-2 border-[#1A2853] -my-10">
                    <h3 className="font-['Jost'] font-bold text-[26px] text-[#1A2853] uppercase tracking-wider mb-5">
                        Superior
                    </h3>
                    <p className="font-['Jost'] text-[16px] text-[#64748B] leading-relaxed mb-8">
                        Essential tools for individual lawyers starting their digital journey
                    </p>
                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="font-['Jost'] font-bold text-[56px] text-[#1A2853]">40$</span>
                        <span className="font-['Jost'] text-[20px] text-[#64748B]">/month</span>
                    </div>
                    <Link href="/pricing-plan/payment" className="block w-full py-4 rounded-full bg-[#1A2853] font-['Jost'] font-semibold text-[16px] text-white hover:bg-[#2A3B73] transition-all mb-10 text-center">
                        Select Plan
                    </Link>
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#1A2853] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Standard case management</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#1A2853] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Basic document storage</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#1A2853] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Email Integration</span>
                        </div>
                    </div>
                </div>

                {/* Online Pro Plan */}
                <div className="bg-white rounded-3xl py-12 px-10 w-[320px] min-h-[480px] shadow-sm border border-gray-100">
                    <h3 className="font-['Jost'] font-bold text-[20px] text-[#1A2853] uppercase tracking-wider mb-5">
                        Online Pro
                    </h3>
                    <p className="font-['Jost'] text-[16px] text-[#64748B] leading-relaxed mb-8">
                        Essential tools for individual lawyers starting their digital journey
                    </p>
                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="font-['Jost'] font-bold text-[48px] text-[#1A2853]">20$</span>
                        <span className="font-['Jost'] text-[18px] text-[#64748B]">/month</span>
                    </div>
                    <Link href="/pricing-plan/payment" className="block w-full py-4 rounded-full border border-gray-300 font-['Jost'] font-medium text-[16px] text-[#1A2853] hover:bg-gray-50 transition-all mb-10 text-center">
                        Select Plan
                    </Link>
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#64748B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Standard case management</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#64748B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Basic document storage</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-[#64748B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-['Jost'] text-[16px] text-[#374151] font-medium">Email Integration</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-white border-t border-gray-200 py-6 mt-60">
                <div className="text-center">
                    <p className="font-['Jost'] text-[14px] text-[#64748B]">
                        © 2025 LEGAL.MU Lawfirm. All Rights Reserved
                    </p>
                </div>
            </footer>
        </main>
    );
}
