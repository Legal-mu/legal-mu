'use client';

import Image from 'next/image';
import { DocumentTextIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

interface InsightsSectionProps {
    lawyer: any;
}

export default function InsightsSection({ lawyer }: InsightsSectionProps) {
    const publications = [
        {
            id: 1,
            title: 'Understanding the New Finance Act 2025',
            date: 'Oct 11, 2025',
            readTime: '5 min read',
            type: 'Article',
            icon: <DocumentTextIcon className="w-4 h-4" />,
            image: '/publication-placeholder.png',
        },
        {
            id: 2,
            title: 'Common Mistakes in Business Contracts',
            date: 'Sept 21, 2024',
            readTime: '10 min watch',
            type: 'Video',
            icon: <PlayCircleIcon className="w-4 h-4" />,
            image: '/publication-placeholder.png',
        },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F1F5F9] rounded-lg">
                        <DocumentTextIcon className="w-6 h-6 text-[#1A2853]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1A2853]">Insights & Publications</h2>
                </div>
                <button className="text-sm font-bold text-[#1A2853] hover:text-[#2A3B73] transition-colors">
                    View All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {publications.map((pub) => (
                    <div key={pub.id} className="group cursor-pointer">
                        <div className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-sm">
                            <Image
                                src={pub.image}
                                alt={pub.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-4 left-4">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#1A2853] uppercase tracking-wider shadow-sm">
                                    {pub.icon}
                                    {pub.type}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-[#1A2853] leading-tight group-hover:text-blue-600 transition-colors">
                                {pub.title}
                            </h3>
                            <p className="text-xs text-[#64748B] font-medium">
                                {pub.date} • {pub.readTime}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
