'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface ResourcesHeaderProps {
    activeResource?: 'Practice Areas' | 'Articles / Blogs' | 'Videos Explainers' | 'Q&A Tool';
}

export default function ResourcesHeader({ activeResource = 'Videos Explainers' }: ResourcesHeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Lawyers Directory', href: '/lawyers' },
        { name: 'Community', href: '/community' },
    ];

    const resources = [
        { name: 'Practice Areas', href: '/practice-area' },
        { name: 'Articles / Blogs', href: '/blog' },
        { name: 'Videos Explainers', href: '/legal-explainer' },
        { name: 'Q&A Tool', href: '/qa-tool' },
    ];

    return (
        <header className="fixed w-full top-0 z-50 bg-[#F6F8FF] border-b border-gray-100 font-jost">
            <div className="relative w-full px-20 py-8 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Legal.mu Logo"
                            width={180}
                            height={50}
                            className="object-contain"
                        />
                    </Link>
                </div>

                {/* Navigation Pill - Matching PracticeAreaHeader layout */}
                <nav className="absolute left-1/2 top-1/2 transform -translate-x-[55%] -translate-y-1/2 hidden lg:flex items-center bg-white border border-[#1A2853]/20 rounded-full px-24 py-5 shadow-sm">
                    <div className="flex items-center gap-16">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center gap-2 text-base font-bold transition-all ${isDropdownOpen || activeResource ? 'text-[#1A2853] border-b-2 border-[#1A2853] pb-0.5' : 'text-[#64748B] hover:text-[#1A2853]'
                                    }`}
                            >
                                Resources
                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-full right-0 mt-8 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    {resources.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`block px-6 py-3 text-[14px] font-medium transition-colors ${activeResource === item.name
                                                ? 'bg-[#F8FAFC] text-[#1A2853] flex items-center justify-between'
                                                : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1A2853]'
                                                }`}
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {item.name}
                                            {activeResource === item.name && (
                                                <ChevronDownIcon className="w-4 h-4 text-[#1A2853]" />
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
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
    );
}
