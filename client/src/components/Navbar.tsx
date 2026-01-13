'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-2 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Image src="/legal-mu-logo.webp" alt="Legal.mu Logo" width={200} height={40} className="object-contain" />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center justify-center flex-1">
                    <div className="flex items-center gap-20 border border-[#1A2542] rounded-full px-24 py-3 bg-white/50 backdrop-blur-md shadow-sm">
                        <Link
                            href="/"
                            className={`px-2 py-1 text-sm font-medium transition-all ${pathname === '/'
                                ? 'text-[#1A2542] font-bold border-b-2 border-[#1A2542]'
                                : 'text-[#64748b] hover:text-[#1A2542]'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/lawyers-directory"
                            className={`px-2 py-1 text-sm font-medium transition-all ${pathname === '/lawyers-directory'
                                ? 'text-[#1A2542] font-bold border-b-2 border-[#1A2542]'
                                : 'text-[#64748b] hover:text-[#1A2542]'
                                }`}
                        >
                            Lawyers Directory
                        </Link>
                        <Link
                            href="/community"
                            className={`px-2 py-1 text-sm font-medium transition-all ${pathname === '/community'
                                ? 'text-[#1A2542] font-bold border-b-2 border-[#1A2542]'
                                : 'text-[#64748b] hover:text-[#1A2542]'
                                }`}
                        >
                            Community
                        </Link>
                        <Link
                            href="/resources"
                            className={`px-2 py-1 text-sm font-medium transition-all ${pathname === '/resources'
                                ? 'text-[#1A2542] font-bold border-b-2 border-[#1A2542]'
                                : 'text-[#64748b] hover:text-[#1A2542]'
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
