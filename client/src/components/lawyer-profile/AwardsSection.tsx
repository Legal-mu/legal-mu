'use client';

import { AcademicCapIcon } from '@heroicons/react/24/outline';

interface AwardsSectionProps {
    lawyer: any;
}

export default function AwardsSection({ lawyer }: AwardsSectionProps) {
    const awards = [
        {
            id: 1,
            title: 'Lawyer of the Year',
            organization: 'Mauritius Legal Awards 2022',
            icon: <AcademicCapIcon className="w-5 h-5 text-[#64748B]" />,
        },
        {
            id: 2,
            title: 'Top Criminal Attorney',
            organization: 'Legal 500 EMEA',
            icon: <AcademicCapIcon className="w-5 h-5 text-[#64748B]" />,
        },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F1F5F9] rounded-lg">
                    <AcademicCapIcon className="w-6 h-6 text-[#1A2853]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1A2853]">Awards & Recognition</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {awards.map((award) => (
                    <div
                        key={award.id}
                        className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-2xl border border-gray-50 hover:border-[#1A2853]/10 transition-colors"
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">
                            {award.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1A2853] text-sm">{award.title}</h3>
                            <p className="text-xs text-[#64748B]">{award.organization}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
