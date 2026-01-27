'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import ProfileSidebar from './ProfileSidebar';

interface ProfileLayoutProps {
    children: ReactNode;
    activeSection: 'account' | 'personal' | 'contact' | 'practice' | 'bio' | 'socials';
    breadcrumb: string;
    title: string;
    subtitle: string;
    profileCompletion?: number;
}

export default function ProfileLayout({
    children,
    activeSection,
    breadcrumb,
    title,
    subtitle,
    profileCompletion = 40,
}: ProfileLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'rgba(240, 240, 240, 1)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
            {/* Header */}
            <header className="bg-white h-[80px] px-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="LEGAL.MU" width={200} height={120} />
                </div>
                <Link href="/" className="flex items-center gap-2 text-[#0F172A] text-sm font-medium hover:text-[#1E3A5F] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Home
                </Link>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex">
                {/* Left Sidebar */}
                <ProfileSidebar
                    activeSection={activeSection}
                    profileCompletion={profileCompletion}
                />

                {/* Main Panel */}
                <main className="flex-1 pt-8 pb-32 pl-32 pr-32 flex flex-col items-start">
                    {/* Breadcrumb */}
                    <div className="mb-6 w-full">
                        <span className="text-[#64748B] text-sm">Profile</span>
                        <span className="text-[#64748B] text-sm mx-2">&gt;</span>
                        <span className="text-[#1E3A5F] text-sm font-medium">{breadcrumb}</span>
                    </div>

                    {/* Title */}
                    <div className="w-full">
                        <h1 className="text-[#1E3A5F] text-[40px] font-bold mb-3">{title}</h1>
                        <p className="text-[#64748B] text-base mb-8">{subtitle}</p>
                    </div>

                    {/* Content */}
                    {children}
                </main>
            </div>
        </div>
    );
}
