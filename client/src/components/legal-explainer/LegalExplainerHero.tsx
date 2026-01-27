import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function LegalExplainerHero() {
    return (
        <section className="bg-white rounded-[48px] p-12 md:p-16 lg:p-16 shadow-sm border border-gray-50 max-w-[1440px] mx-auto mt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                {/* Text Content */}
                <div className="flex-1 max-w-[640px]">
                    <h1 className="text-[52px] md:text-[58px] leading-[110%] font-bold text-[#111827] mb-8">
                        Legal Explainer Library
                    </h1>
                    <p className="text-[16px] md:text-[18px] leading-[160%] text-[#6B7280] mb-12 font-medium">
                        Explore specialized legal guidance for civil disputes and private law matters in Mauritius. Access detailed resources and expert representation for your specific legal needs.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-[620px] bg-white rounded-full flex items-center overflow-hidden">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-6 w-6 text-[#94A3B8]" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-16 pr-40 py-6 bg-white border-none rounded-full text-[18px] focus:ring-0 shadow-none outline-none placeholder-[#6B7280] font-normal"
                            placeholder="Search by Legal Explainers, Topics or Keywords"
                        />
                        <button className="absolute right-3 bg-[#1A2853] text-white px-10 py-3.5 rounded-[12px] text-[18px] font-bold hover:bg-[#1A2853]/90 transition-all">
                            Search
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="flex-1 w-full max-w-[560px]">
                    <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg transform rotate-[-1deg]">
                        <Image
                            src="/lady_justice_landscape.png"
                            alt="Lawyer at work"
                            fill
                            className="object-cover"
                        />
                        {/* Play Button Overlay (Optional for Hero) */}
                    </div>
                </div>
            </div>
        </section>
    );
}
