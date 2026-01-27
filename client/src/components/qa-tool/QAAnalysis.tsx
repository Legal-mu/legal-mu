'use client';

import { ScaleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const analysisSections = [
    {
        title: 'Statutory Compliance',
        content: 'Under Mauritian law, commercial leases are primarily governed by the civil code & specific tenancy acts. A valid agreement must clearly define the objet (the premises) and the prix (the rent).'
    },
    {
        title: 'Duration & Renewal',
        content: 'Most commercial leases follow a "3-6-9" year structure, it is critical to specify renewal clauses and notice periods (usually 6 months) to avoid automatic termination or tacit relocation.'
    },
    {
        title: 'Maintenance & Charges',
        content: 'The lease must delineate responsibilities for "grosses reparations" (major repairs) versus routine maintenance. Triple net leases are common but require explicit drafting.'
    }
];

export default function QAAnalysis() {
    return (
        <section className="max-w-[1440px] mx-auto mb-16 px-4 sm:px-8 lg:px-12">
            <div className="bg-white rounded-[40px] p-8 md:p-12 lg:p-16 shadow-sm border border-gray-100 max-w-[1000px] mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-[#F6F8FF] rounded-lg">
                        <ScaleIcon className="w-6 h-6 text-[#1A2853]" />
                    </div>
                    <span className="text-[14px] font-bold text-[#1A2853] uppercase tracking-wider">
                        Legal Analysis
                    </span>
                </div>

                {/* Main Title */}
                <h2 className="text-[32px] md:text-[40px] font-bold text-[#1A2853] leading-[120%] mb-12">
                    Understanding Commercial Lease Requirements
                </h2>

                {/* Content Sections */}
                <div className="space-y-12 mb-16">
                    {analysisSections.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h3 className="text-[24px] font-bold text-[#1A2853]">
                                {section.title}
                            </h3>
                            <p className="text-[18px] text-[#6B7280] leading-[170%] font-medium">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* AI Disclaimer */}
                <div className="bg-[#F8FAFC] rounded-2xl p-6 flex gap-4 items-start border border-[#E2E8F0]">
                    <InformationCircleIcon className="w-6 h-6 text-[#94A3B8] flex-shrink-0 mt-0.5" />
                    <p className="text-[14px] text-[#94A3B8] leading-[160%] font-medium">
                        This AI generated summary is for information purposes only and does not constitute formal legal advice.
                        While based on legal.mu knowledge base laws may change. Consult a qualified professional for binding advice.
                    </p>
                </div>
            </div>
        </section>
    );
}
