'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    User,
    Mail,
    Briefcase,
    FileText,
    Share2,
    LogOut,
    CheckCircle2,
    Circle
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';

interface SidebarProps {
    completedSteps?: string[];
}

export default function DashboardSidebar({ completedSteps = [] }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const clearAuth = useAuthStore(state => state.clearAuth);

    const navItems = [
        {
            name: 'Overview',
            href: '/lawyer/dashboard',
            icon: Home,
            id: 'overview'
        },
        {
            name: 'Professional Identity',
            href: '/lawyer/dashboard/professional-identity',
            icon: User,
            id: 'professional-identity'
        },
        {
            name: 'Contact Information',
            href: '/lawyer/dashboard/contact-information',
            icon: Mail,
            id: 'contact-information'
        },
        {
            name: 'Practice Details',
            href: '/lawyer/dashboard/practice-details',
            icon: Briefcase,
            id: 'practice-details'
        },
        {
            name: 'Biography & Headshot',
            href: '/lawyer/dashboard/biography',
            icon: FileText,
            id: 'biography'
        },
        {
            name: 'Social Media',
            href: '/lawyer/dashboard/social-media',
            icon: Share2,
            id: 'social-media'
        },
    ];

    const handleLogout = async () => {
        clearAuth();
        await logoutAction();
    };

    const isStepCompleted = (id: string) => {
        return completedSteps.includes(id);
    };

    return (
        <div className="w-80 bg-[#1E3A5F] text-white flex flex-col min-h-screen sticky top-0">
            <div className="p-8">
                <Link href="/" className="flex items-center gap-2 mb-10">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-[#1E3A5F] font-bold text-xl">L</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight">LEGAL.MU</span>
                </Link>

                <div className="space-y-2">
                    <p className="text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-4 px-3">
                        Profile Completion
                    </p>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const isDone = isStepCompleted(item.id);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all group ${isActive
                                    ? 'bg-white/10 text-white border border-white/20'
                                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={20} className={isActive ? 'text-white' : 'text-[#64748B] group-hover:text-white'} />
                                    <span className="font-medium text-[15px]">{item.name}</span>
                                </div>
                                {item.id !== 'overview' && (
                                    isDone ? (
                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                    ) : (
                                        <Circle size={16} className="text-[#334155]" />
                                    )
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="mt-auto p-8 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors w-full px-3 py-2 rounded-xl hover:bg-white/5"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
