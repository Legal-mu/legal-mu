'use client';

import { UserIcon } from '@heroicons/react/24/outline';

export default function AboutSection() {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
            <div className="flex items-center gap-3">
                <UserIcon className="w-6 h-6 text-[#1A2853]" />
                <h2 className="text-2xl font-bold text-[#1A2853]">About Kim</h2>
            </div>

            <p className="text-[#64748B] leading-relaxed">
                Kim Jong Un is a highly respected founder of Bin Laden Defense, specializing in criminal defense and civil rights. With over 6 years of experience practicing in the supreme court of Mauritius. Kim is a dedicated Criminal Defense and Civil Rights Lawyer committed to protecting individual freedoms and ensuring justice is served. With extensive experience defending clients against complex criminal charges and advocating for civil liberties, they provide strategic, compassionate, and fearless representation. Known for standing firm against injustice, they work tirelessly to safeguard constitutional rights and deliver fair outcomes—both inside and outside the courtroom.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Languages Spoken</h3>
                    <p className="text-[#1A2853] font-medium">English, French, Creole</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Admitted to Bar</h3>
                    <p className="text-[#1A2853] font-medium">2008 (Mauritius), 2009 (England)</p>
                </div>
            </div>
        </div>
    );
}
