'use client';

import React from 'react';
import {
    Users,
    Scale,
    Clock,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    ArrowUpRight
} from 'lucide-react';
import { useLawyers, useClients } from '@/hooks/useAdminData';

export default function AdminOverview() {
    const { data: lawyers, isLoading: lawyersLoading } = useLawyers();
    const { data: clients, isLoading: clientsLoading } = useClients();

    const stats = [
        {
            label: 'Total Lawyers',
            value: lawyers?.length || 0,
            icon: Scale,
            color: 'bg-blue-500',
            change: '+12%',
            trend: 'up'
        },
        {
            label: 'Total Clients',
            value: clients?.length || 0,
            icon: Users,
            color: 'bg-indigo-500',
            change: '+5%',
            trend: 'up'
        },
        {
            label: 'Pending Approvals',
            value: lawyers?.filter((l: any) => l.status === 'PENDING').length || 0,
            icon: Clock,
            color: 'bg-amber-500',
            change: '2 new',
            trend: 'neutral'
        },
        {
            label: 'Active Cases',
            value: '24',
            icon: CheckCircle2,
            color: 'bg-emerald-500',
            change: '+8%',
            trend: 'up'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-1000">Overview</h2>
                <p className="text-gray-800 mt-1">Welcome back, admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-[#F5F5F5] p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className={`${stat.color} p-3 rounded-xl text-white`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50'
                                }`}>
                                {stat.change}
                                {stat.trend === 'up' && <ArrowUpRight size={14} className="ml-0.5" />}
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                {lawyersLoading || clientsLoading ? '...' : stat.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts/Tables Placeholder Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#F5F5F5] p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800">Growth Activity</h3>
                        <select className="text-sm border-none bg-gray-50 rounded-lg text-gray-500 py-2 px-3">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <div className="text-center">
                            <TrendingUp className="mx-auto text-gray-300" size={48} />
                            <p className="mt-2 text-gray-400 font-medium text-sm">Growth metrics will appear here</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F5F5F5] p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-6">System Status</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-600">Database</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 uppercase">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-600">Authentication</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 uppercase">Operational</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-600">Email Service</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 uppercase">Operational</span>
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                                <AlertCircle className="text-blue-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs font-bold text-blue-700 uppercase mb-1">Backup notice</p>
                                    <p className="text-xs text-blue-600 leading-relaxed">System backup completed successfully at 04:00 AM today.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
