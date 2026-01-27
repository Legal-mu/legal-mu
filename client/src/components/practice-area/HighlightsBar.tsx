'use client';

import { ShieldCheckIcon, DocumentTextIcon, BookOpenIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const highlights = [
    { icon: ShieldCheckIcon, label: 'Understand Rights' },
    { icon: DocumentTextIcon, label: 'Key Articles & Clauses' },
    { icon: BookOpenIcon, label: 'Expert Video Guide' },
    { icon: UserGroupIcon, label: 'Legal Specialists' },
];

export default function HighlightsBar({ title }: { title: string }) {
    return (
        <div className="px-10 pb-10">
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-[#1A2853] mb-2">{title} Highlights</h3>
                    <p className="text-sm text-gray-500">Everything you need to navigate {title.toLowerCase()}.</p>
                </div>

                <div className="flex flex-wrap items-center gap-8 md:gap-16">
                    {highlights.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 group cursor-pointer">
                            <item.icon className="w-5 h-5 text-[#64748B] group-hover:text-[#1A2853] transition-colors" />
                            <span className="text-[14px] font-semibold text-[#1A2853]">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
