'use client';

import Link from 'next/link';

interface ProfileSidebarProps {
    activeSection: 'account' | 'personal' | 'contact' | 'practice' | 'bio' | 'socials';
    profileCompletion?: number;
    userName?: string;
    userRole?: string;
}

const menuItems = [
    { icon: 'settings', label: 'Account Settings', id: 'account', href: '/profile' },
    { icon: 'personal', label: 'Personal & Prof.....', id: 'personal', href: '/profile/personal-info' },
    { icon: 'phone', label: 'Contact Information', id: 'contact', href: '/profile/contact' },
    { icon: 'briefcase', label: 'Practice Details', id: 'practice', href: '/profile/practice' },
    { icon: 'media', label: 'Bio & Media', id: 'bio', href: '/profile/bio' },
    { icon: 'social', label: 'Socials & Endorsements', id: 'socials', href: '/profile/socials' },
];

export default function ProfileSidebar({
    activeSection,
    profileCompletion = 40,
    userName = 'Ratti Petit',
    userRole = 'Associate Lawyer',
}: ProfileSidebarProps) {
    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'settings':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                );
            case 'personal':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                );
            case 'phone':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                );
            case 'briefcase':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                );
            case 'media':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                    </svg>
                );
            case 'social':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <aside
            className="w-[515px] bg-white pt-14 pb-6 px-6 flex flex-col items-center border-t border-r border-[#E2E8F0]"
            style={{ opacity: 1, transform: 'rotate(0deg)' }}
        >
            {/* User Profile */}
            <div className="flex items-center gap-6 mb-14 w-[327px]">
                <div className="w-24 h-24 rounded-full bg-[#1E3A5F] overflow-hidden flex items-center justify-center shrink-0">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#0F172A] font-bold text-[24px] leading-tight">{userName}</h2>
                    <p className="text-[#64748B] text-[16px]">{userRole}</p>
                </div>
            </div>

            {/* Profile Completion */}
            <div
                className="bg-[#F5F5F5] rounded-[20px] pt-[18px] pb-[18px] px-[16px] mb-8 w-[327px] h-[130px] flex flex-col gap-[10px]"
                style={{ opacity: 1, transform: 'rotate(0deg)' }}
            >
                <div className="flex items-center justify-between">
                    <span className="text-[#0F172A] font-semibold text-sm">Profile Completion</span>
                    <span className="text-[#1E3A5F] font-bold text-sm">{profileCompletion}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#1E3A5F] rounded-full transition-all duration-300"
                        style={{ width: `${profileCompletion}%` }}
                    />
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed">
                    Complete your profile to increase visibility to potential clients.
                </p>
            </div>

            {/* Edit Profile Menu */}
            <div>
                <h3 className="text-[#0F172A] font-bold text-sm mb-4 tracking-wide">EDIT PROFILE</h3>
                <nav
                    className="flex flex-col gap-[19px] w-[327px] h-[419px]"
                    style={{ opacity: 1, transform: 'rotate(0deg)' }}
                >
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full ${activeSection === item.id
                                ? 'bg-[#1E3A5F] text-white'
                                : 'bg-[#F5F5F5] text-[#0F172A] hover:bg-[#E2E8F0]'
                                }`}
                        >
                            {renderIcon(item.icon)}
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer in Sidebar */}
            <p className="mt-auto pt-8 text-[#64748B] text-sm">© 2025 LEGAL.MU Lawfirm. All Rights Reserved</p>
        </aside>
    );
}
