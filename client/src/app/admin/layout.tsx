'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    UserSquare2,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { logoutAction } from '@/app/actions/auth';

const sidebarItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Lawyers', href: '/admin/lawyers', icon: UserSquare2 },
    { name: 'Clients', href: '/admin/clients', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const { user, clearAuth } = useAuthStore();

    const handleLogout = async () => {
        clearAuth();
        await logoutAction();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-[#1A2853] text-white transition-all duration-300 flex flex-col fixed h-full z-30`}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <Link href="/">
                            <Image src="/legal-mu-logo.webp" alt="Legal.mu Logo" width={150} height={40} className="brightness-200" />
                        </Link>
                    ) : (
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                            <span className="text-[#1e3a8a] font-bold">L</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-blue-800 rounded-md transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-3 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center p-3 rounded-lg transition-all ${isActive
                                    ? 'bg-white text-[#1e3a8a] shadow-md'
                                    : 'text-blue-100 hover:bg-blue-800'
                                    }`}
                            >
                                <item.icon size={22} className={isActive ? 'text-[#1e3a8a]' : ''} />
                                {isSidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-blue-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 text-blue-100 hover:bg-blue-800 rounded-lg transition-all"
                    >
                        <LogOut size={22} />
                        {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'
                    }`}
            >
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {sidebarItems.find(i => i.href === pathname)?.name || 'Admin Panel'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-100 w-64"
                            />
                        </div>

                        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role.toLowerCase()}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1e3a8a] font-bold border border-blue-100">
                                {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Body */}
                <div className="p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
