'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const suggestedTags = [
    'Property Rights',
    'Divorce Law',
    'Workplace Disputes'
];

export default function QAHero() {
    return (
        <section className="max-w-[1440px] mx-auto mt-8 mb-20 px-4 sm:px-8 lg:px-12">
            <div className="bg-white rounded-[48px] p-12 md:p-16 lg:px-20 lg:pt-20 lg:pb-24 shadow-sm border border-gray-50 relative">
                <div className="max-w-[800px]">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F1F5F9] rounded-full mb-8">
                        <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></div>
                        <span className="text-[12px] font-bold text-[#1e293b] uppercase tracking-wider">
                            Powered by Advance AI
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-[52px] md:text-[58px] font-bold text-[#1A2853] leading-[110%] mb-6">
                        Instant Legal Intelligence
                    </h1>

                    <p className="text-[18px] text-[#6B7280] leading-[160%] mb-0 font-medium max-w-[600px]">
                        Navigate the complexities of Mauritian law with our sophisticated AI assistant.
                        Professional insights delivered instantly.
                    </p>
                </div>

                {/* Search Bar - Overlapping Bottom - Centered */}
                <div className="absolute -bottom-8 left-0 right-0 px-4 flex justify-center">
                    <div className="relative w-full max-w-[800px]">
                        <div className="bg-white border border-[#1A2853] rounded-[16px] flex items-center p-2 shadow-sm transition-all">
                            <div className="pl-6 pr-3">
                                <MagnifyingGlassIcon className="h-6 w-6 text-[#94A3B8] stroke-[1.5]" />
                            </div>
                            <input
                                type="text"
                                className="block w-full py-4 bg-transparent border-none text-[14px] md:text-[15px] outline-none placeholder-[#94A3B8] font-normal"
                                placeholder="Explain Commercial Lease Requirements in simple words I have an exam tomorrow"
                            />
                            <button className="bg-[#1A2853] text-white px-8 py-3.5 rounded-[12px] text-[18px] font-bold hover:bg-[#1A2853]/90 transition-all ml-2">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggested Tags - Below Search Bar - Centered */}
            <div className="mt-20 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-6">
                    <span className="text-[17px] font-bold text-[#94A3B8]">Suggested:</span>
                    <div className="flex flex-wrap justify-center gap-4">
                        {suggestedTags.map((tag) => (
                            <button
                                key={tag}
                                className="px-8 py-3 bg-white border border-[#E2E8F0] rounded-full text-[15px] font-bold text-[#1A2853] hover:border-[#1A2853]/30 hover:bg-[#F8FAFC] transition-all shadow-sm"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
