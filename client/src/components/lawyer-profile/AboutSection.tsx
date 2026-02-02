'use client';

import { UserIcon } from '@heroicons/react/24/outline';

interface AboutSectionProps {
    lawyer: any;
}

export default function AboutSection({ lawyer }: AboutSectionProps) {
    const profile = lawyer?.lawyerProfile;
    const firstName = lawyer?.firstName || 'Lawyer';

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
            <div className="flex items-center gap-3">
                <UserIcon className="w-6 h-6 text-[#1A2853]" />
                <h2 className="text-2xl font-bold text-[#1A2853]">About {firstName}</h2>
            </div>

            <p className="text-[#64748B] leading-relaxed">
                {profile?.extendedBiography || profile?.biography ||
                    `${firstName} is a dedicated legal professional committed to providing excellent legal services. With expertise in various practice areas, they provide strategic and compassionate representation to their clients.`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Languages Spoken</h3>
                    <p className="text-[#1A2853] font-medium">
                        {profile?.languages?.join(', ') || 'English, French'}
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Admitted to Bar</h3>
                    <p className="text-[#1A2853] font-medium">
                        {profile?.admissionYear ? `${profile.admissionYear} (Mauritius)` : 'Mauritius'}
                    </p>
                </div>
            </div>
        </div>
    );
}
