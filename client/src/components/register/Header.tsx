'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
    activeLink?: 'for-lawyers' | 'for-clients' | 'homepage';
}

export default function Header({ activeLink = 'for-lawyers' }: HeaderProps) {
    return (
        <nav className="bg-white px-8 md:px-16 h-[120px] flex justify-center items-center">
            <div className="w-full max-w-[1700px] flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/legal-mu-logo.webp"
                        alt="LEGAL.MU - Access to justice"
                        width={200}
                        height={40}
                        className="object-contain"
                    />
                </Link>

                {/* Nav Links - centered */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/for-lawyers"
                        className={`text-[#1E3A5F] text-[14px] font-medium ${activeLink === 'for-lawyers' ? 'underline underline-offset-[6px] decoration-1' : 'hover:opacity-70'}`}
                    >
                        For Lawyers
                    </Link>
                    <Link
                        href="/for-clients"
                        className={`text-[#1E3A5F] text-[14px] font-medium ${activeLink === 'for-clients' ? 'underline underline-offset-[6px] decoration-1' : 'hover:opacity-70'}`}
                    >
                        For Clients
                    </Link>
                    <Link
                        href="/"
                        className={`text-[#1E3A5F] text-[14px] font-medium ${activeLink === 'homepage' ? 'underline underline-offset-[6px] decoration-1' : 'hover:opacity-70'}`}
                    >
                        Homepage
                    </Link>
                </div>

                {/* Auth Buttons - Combined Container */}
                <div className="flex items-center border border-slate-200 rounded-full overflow-hidden">
                    <Link
                        href="/login"
                        className="text-[#1E3A5F] text-[14px] font-medium px-5 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="bg-[#1E3A5F] text-white px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-[#2D4A6F] transition-colors"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}
