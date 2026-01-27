'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface PracticeAreaCardProps {
    id: string;
    title: string;
    description: string;
    href?: string;
}

export default function PracticeAreaCard({ id, title, description, href = '#' }: PracticeAreaCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#1A2853]/10 transition-all duration-300 group">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center mb-4 group-hover:bg-[#1A2853]/5 transition-colors">
                <svg className="w-5 h-5 text-[#1A2853]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-[#1A2853] mb-1">{title}</h3>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{description}</p>

            {/* Link */}
            <Link
                href={href}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A2853] hover:text-[#2A3B73] transition-colors"
            >
                Explore Hub
                <ArrowRightIcon className="w-3 h-3" />
            </Link>
        </div>
    );
}
