'use client';

import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';

export default function CTASection() {
    return (
        <section className="py-10 px-50 border-t border-gray-100">
            <div className="max-w-[1440px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="max-w-xl">
                    <h2 className="text-[32px] font-bold text-[#1A2853] mb-2">Need Professional Legal Help?</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Our Legal Information Hub provides the foundation for personalized representation and advice, connect with verified specialists in our lawyer&apos;s directory.
                    </p>
                </div>
                <Link
                    href="/lawyers"
                    className="flex items-center gap-2 px-5 py-3 bg-[#1A2853] text-white rounded-lg text-sm font-semibold hover:bg-[#2A3B73] transition-all shadow-md whitespace-nowrap"
                >
                    Find a Lawyer
                    <UserIcon className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
