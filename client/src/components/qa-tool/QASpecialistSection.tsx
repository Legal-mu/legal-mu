'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import SpecialistCard from './SpecialistCard';

const specialists = [
    {
        name: 'Raju Rastogi',
        role: 'Senior Advocate',
        rating: 4.9,
        reviews: 124,
        image: '/lawyer-placeholder.png',
        tags: ['Property', 'Tax Law']
    },
    {
        name: 'Shri Krishan Jagandas',
        role: 'Senior Advocate',
        rating: 4.8,
        reviews: 124,
        image: '/lawyer-placeholder.png',
        tags: ['Property', 'Civil Law']
    }
];

export default function QASpecialistSection() {
    return (
        <section className="max-w-[1440px] mx-auto mb-32 px-4 sm:px-8 lg:px-12">
            <div className="bg-white rounded-[40px] p-12 md:p-16 lg:p-20 shadow-sm border border-gray-50 mx-auto">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                    <div className="max-w-[600px]">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F6F8FF] rounded-full mb-6">
                            <div className="w-1.5 h-1.5 bg-[#1A2853] rounded-full"></div>
                            <span className="text-[12px] font-bold text-[#1A2853] uppercase tracking-wider">
                                Recommended Step
                            </span>
                        </div>
                        <h2 className="text-[36px] font-bold text-[#1A2853] mb-4">
                            CONSULT A SPECIALIST
                        </h2>
                        <p className="text-[18px] text-[#6B7280] leading-[160%] font-medium">
                            Our AI identified your query as related to <span className="text-[#1A2853] font-bold">Property Law</span>. Connect with top rated lawyers in this field.
                        </p>
                    </div>

                    <button className="bg-[#1A2853] text-white px-8 py-4 rounded-xl flex items-center gap-3 group hover:bg-[#1A2853]/90 transition-all shadow-lg whitespace-nowrap">
                        <span className="text-[16px] font-bold">View All Specialists</span>
                        <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Specialists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {specialists.map((specialist) => (
                        <SpecialistCard key={specialist.name} {...specialist} />
                    ))}
                </div>
            </div>
        </section>
    );
}
