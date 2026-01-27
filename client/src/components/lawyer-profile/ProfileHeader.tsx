'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ProfileHeader() {
    return (
        <header className="fixed w-full top-0 z-50 bg-[#F6F8FF] border-b border-gray-100">
            <div className="relative w-full px-20 py-8 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Legal.mu Logo"
                            width={200}
                            height={100}
                            className="object-contain" // Kept existing style relative to user request to not effect others
                        />
                    </Link>
                </div>

                {/* Navigation Pill */}
                <nav className="absolute left-1/2 top-1/2 transform -translate-x-[55%] -translate-y-1/2 hidden lg:flex items-center bg-white border border-[#1A2853]/30 rounded-full px-48 py-4 shadow-sm">
                    <div className="flex items-center gap-16">
                        <Link href="/" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                            Home
                        </Link>
                        <Link href="/lawyers" className="text-base font-bold text-[#1A2853] border-b-2 border-[#1A2853] pb-0.5">
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

                {/* Search & Login */}
                <div className="flex items-center gap-6">
                    <div className="relative group hidden sm:block">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search Lawyers..."
                            className="pl-12 pr-4 py-6 bg-[#F1F5F9] border-none rounded-lg text-sm focus:ring-1 focus:ring-[#1A2853]/10 w-48 transition-all placeholder:text-gray-400"
                        />
                    </div>
                    <Link
                        href="/login"
                        className="px-8 py-4 bg-[#1A2853] text-white rounded-lg text-sm font-semibold hover:bg-[#2A3B73] transition-all shadow-sm"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
}
