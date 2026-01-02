'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Image src="/legal-mu-logo.webp" alt="Legal.mu Logo" width={220} height={60} className="object-contain" />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center justify-center flex-1">
                    <div className="flex items-center gap-20 border border-gray-400 rounded-3xl px-2 py-2 bg-white/50 backdrop-blur-md shadow-sm">
                        <Link
                            href="/"
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${pathname === '/'
                                ? 'text-[#1e3a8a] bg-blue-50'
                                : 'text-[#64748b] hover:text-[#1e3a8a] hover:bg-gray-50'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/services"
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${pathname === '/services'
                                ? 'text-[#1e3a8a] bg-blue-50'
                                : 'text-[#64748b] hover:text-[#1e3a8a] hover:bg-gray-50'
                                }`}
                        >
                            Legal Services
                        </Link>
                        <Link
                            href="/community"
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${pathname === '/community'
                                ? 'text-[#1e3a8a] bg-blue-50'
                                : 'text-[#64748b] hover:text-[#1e3a8a] hover:bg-gray-50'
                                }`}
                        >
                            Community
                        </Link>
                        <Link
                            href="/resources"
                            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${pathname === '/resources'
                                ? 'text-[#1e3a8a] bg-blue-50'
                                : 'text-[#64748b] hover:text-[#1e3a8a] hover:bg-gray-50'
                                }`}
                        >
                            Resources
                        </Link>
                    </div>
                </nav>

                <div className="w-[140px] hidden md:block">
                    {/* Spacer */}
                </div>
            </div>
        </header>
    );
}
