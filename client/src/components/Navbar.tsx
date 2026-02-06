'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { logoutAction } from '../app/actions/auth';
import { getMediaUrl } from '@/lib/utils';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        // 1. Clear client state
        logout();

        // 2. Clear server-side cookie
        await logoutAction();

        // 3. Redirect (logoutAction handles redirect to /login, but we can double check)
        // router.push('/login'); // logoutAction calls redirect()
    };

    const getDashboardLink = () => {
        if (!user) return '/login';
        switch (user.role) {
            case UserRole.ADMIN:
                return '/admin';
            case UserRole.LAWYER:
                return '/lawyer/dashboard';
            case UserRole.CLIENT:
                return '/client/dashboard';
            default:
                return '/dashboard';
        }
    };

    const getUserInitials = () => {
        if (!user) return 'U';
        return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    };

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

                <div className="w-[140px] hidden md:flex items-center justify-end">
                    {!isAuthenticated ? (
                        <Link
                            href="/login"
                            className="bg-[#1A2853] hover:bg-[#111827] text-white px-9 py-2.5 mr-5 rounded-xl font-medium transition-all text-sm"
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="relative group">
                            <button className="flex items-center gap-3 focus:outline-none transition-transform active:scale-95 group">
                                <span className="hidden md:block font-medium text-[#1A2853] text-sm group-hover:text-[#111827] transition-colors">
                                    {user?.firstName}
                                </span>
                                <div className="w-10 h-10 rounded-full bg-[#1A2853] text-white flex items-center justify-center font-bold border-2 border-transparent group-hover:border-white/20 shadow-md overflow-hidden transition-all duration-200 ring-2 ring-transparent group-hover:ring-[#1A2853]/10">
                                    {user?.lawyerProfile?.headshotUrl ? (
                                        <Image
                                            src={getMediaUrl(user.lawyerProfile.headshotUrl)}
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm tracking-widest">{getUserInitials()}</span>
                                    )}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right">
                                <div className="bg-white rounded-2xl py-2 w-64 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden ring-1 ring-black/5">
                                    {/* User Info Header */}
                                    <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2853]/10 text-[#1A2853] flex items-center justify-center font-bold text-sm">
                                            {getUserInitials()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-[#1A2853] truncate">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <Link
                                            href={getDashboardLink()}
                                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1A2853] font-medium rounded-xl transition-colors group/item"
                                        >
                                            <svg className="w-5 h-5 text-gray-400 group-hover/item:text-[#1A2853] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Manage Profile
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium rounded-xl transition-colors group/item"
                                        >
                                            <svg className="w-5 h-5 text-gray-400 group-hover/item:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
