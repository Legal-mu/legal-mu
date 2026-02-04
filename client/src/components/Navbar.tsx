'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100/50 font-jost">
            <div className="max-w-7xl mx-auto px-2 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Image src="/legal-mu-logo.webp" alt="Legal.mu Logo" width={200} height={40} className="object-contain" />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center justify-center flex-1">
                    <div className="flex items-center gap-20 border border-[#1A2542] rounded-[1.75rem] px-10 py-3 bg-white/50 backdrop-blur-md shadow-sm">
                        <Link
                            href="/"
                            className={`px-4 py-2 text-sm font-bold transition-all rounded-[1.5rem] ${pathname === '/'
                                ? 'bg-[#E2E8F0] text-[#1A2853]'
                                : 'text-[#64748b] hover:text-[#1A2853] hover:bg-[#E2E8F0]'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/lawyers-directory"
                            className={`px-4 py-2 text-sm font-bold transition-all rounded-[1.5rem] ${pathname === '/lawyers-directory'
                                ? 'bg-[#E2E8F0] text-[#1A2853]'
                                : 'text-[#64748b] hover:text-[#1A2853] hover:bg-[#E2E8F0]'
                                }`}
                        >
                            Lawyers Directory
                        </Link>
                        <Link
                            href="/community"
                            className={`px-4 py-2 text-sm font-bold transition-all rounded-[1.5rem] ${pathname === '/community'
                                ? 'bg-[#E2E8F0] text-[#1A2853]'
                                : 'text-[#64748b] hover:text-[#1A2853] hover:bg-[#E2E8F0]'
                                }`}
                        >
                            Community
                        </Link>
                        <div className="relative group">
                            <Link
                                href="/resources"
                                className={`px-4 py-2 text-sm font-bold transition-all flex items-center gap-2 rounded-[1.5rem] ${pathname.startsWith('/resources')
                                    ? 'bg-[#E2E8F0] text-[#1A2853]'
                                    : 'text-[#64748b] hover:text-[#1A2853] hover:bg-[#E2E8F0]'
                                    }`}
                            >
                                Resources
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>

                            {/* Dropdown Menu */}
                            <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="bg-white text-[#1A2853] rounded-xl py-2 min-w-[240px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden ml-10">
                                    <Link
                                        href="/resources/practice-areas"
                                        className={`flex items-center justify-between px-5 py-3 mx-2 my-1 rounded-[1.5rem] transition-colors text-sm font-bold group/item ${pathname === '/resources/practice-areas'
                                            ? 'bg-[#E2E8F0] text-[#1A2853]'
                                            : 'hover:bg-[#E2E8F0] text-[#1A2853]'
                                            }`}
                                    >
                                        Practice Areas
                                        <svg className={`w-4 h-4 text-[#1A2853] ${pathname === '/resources/practice-areas' ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href="/resources/articles-blogs"
                                        className={`block px-5 py-3 mx-2 my-1 rounded-[1.5rem] transition-colors text-sm font-medium ${pathname === '/resources/articles-blogs'
                                            ? 'bg-[#E2E8F0] text-[#1A2853] font-bold'
                                            : 'hover:bg-[#E2E8F0] text-[#1A2853]'
                                            }`}
                                    >
                                        Articles / Blogs
                                    </Link>
                                    <Link
                                        href="/resources/videos-explainers"
                                        className={`block px-5 py-3 mx-2 my-1 rounded-[1.5rem] transition-colors text-sm font-medium ${pathname === '/resources/videos-explainers'
                                            ? 'bg-[#E2E8F0] text-[#1A2853] font-bold'
                                            : 'hover:bg-[#E2E8F0] text-[#1A2853]'
                                            }`}
                                    >
                                        Videos Explainers
                                    </Link>
                                    <Link
                                        href="/resources/qa-tool"
                                        className={`block px-5 py-3 mx-2 my-1 rounded-[1.5rem] transition-colors text-sm font-medium ${pathname === '/resources/qa-tool'
                                            ? 'bg-[#E2E8F0] text-[#1A2853] font-bold'
                                            : 'hover:bg-[#E2E8F0] text-[#1A2853]'
                                            }`}
                                    >
                                        Q&A Tool
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="w-[140px] hidden md:block">
                    {/* Spacer */}
                </div>
            </div>
        </header>
    );
}
