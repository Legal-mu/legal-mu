'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PracticeAreaHeader() {
    return (
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
                        <Link href="/resources" className="text-base font-bold text-[#1A2853] border-b-2 border-[#1A2853] pb-0.5">
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
    );
}
