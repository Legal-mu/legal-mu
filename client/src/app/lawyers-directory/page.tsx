'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import {
    MagnifyingGlassIcon,
    ChevronDownIcon,
    StarIcon,
    BookmarkIcon,
    MapPinIcon,
    BriefcaseIcon,
    LanguageIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { LAWYERS } from '@/data/lawyers';

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#F8F9FD]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A2550] mb-6 tracking-tight">
                        Find Your Legal Expert
                    </h1>
                    <p className="text-xl text-[#000000A6] max-w-2xl font-jost mx-auto mb-10 font-medium">
                        Connect with top rated lawyers in Mauritius specializing in your specific legal needs.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center bg-[#F3F4F6] border border-gray-100 rounded-[1rem] p-2 pl-6 shadow-sm">
                            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 mr-4" />
                            <input
                                type="text"
                                placeholder="Search by Name, Practice Area or Location..."
                                className="flex-grow bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-500 text-lg font-medium"
                            />
                            <button className="bg-[#1A2542] hover:bg-[#111827] text-white px-8 py-3 rounded-[1rem] font-bold transition-all ml-2 whitespace-nowrap">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lawyer Listing & Filters Section */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-72 flex-shrink-0">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 uppercase tracking-tight">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-[#1A2542] normal-case">Filters</h2>
                                <button className="text-sm font-semibold text-[#1A2542] hover:text-[#1A2542] tracking-tight normal-case">Clear all</button>
                            </div>

                            {/* Location */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-[#1A2542] mb-4 normal-case">Location</h3>
                                <div className="relative">
                                    <select className="w-full bg-[#F3F4F6] border-none rounded-2xl py-3.5 px-5 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 font-medium lowercase">
                                        <option>All cities</option>
                                        <option>Port Louis</option>
                                        <option>Grand Baie</option>
                                        <option>Curepipe</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Practice Area */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-[#1A2542] mb-4 normal-case">Practice Area</h3>
                                <div className="space-y-3">
                                    {["Corporate Law", "Family Law", "Criminal Defense", "Real Estate", "Immigration"].map((area, idx) => (
                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group normal-case">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" />
                                            </div>
                                            <span className="text-gray-600 font-medium group-hover:text-[#1A2542] transition-colors">{area}</span>
                                        </label>
                                    ))}
                                    <button className="text-sm font-bold text-[#1A2542] mt-2 flex items-center gap-1 normal-case">
                                        Show more <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-[#1A2542] mb-4 normal-case">Experience</h3>
                                <div className="space-y-3">
                                    {["Any", "5+ years", "10+ years", "20+ years"].map((exp, idx) => (
                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group normal-case">
                                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                            <span className="text-gray-600 font-medium group-hover:text-[#1A2542] transition-colors">{exp}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Client Rating */}
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-[#1A2853] mb-4 normal-case">Client Rating</h3>
                                <label className="flex items-center gap-3 cursor-pointer group normal-case">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                    <div className="flex gap-0.5 text-[#1A2853]">
                                        <StarIconSolid className="w-5 h-5" />
                                        <StarIconSolid className="w-5 h-5" />
                                        <StarIconSolid className="w-5 h-5" />
                                        <StarIconSolid className="w-5 h-5" />
                                        <StarIcon className="w-5 h-5" />
                                    </div>
                                    <span className="text-gray-600 font-bold tracking-tight">& Up</span>
                                </label>
                            </div>

                            <button className="w-full bg-[#1A2542] hover:bg-[#111827] text-white font-bold py-3 rounded-xl transition-all shadow-lg text-lg normal-case">
                                Apply Filters
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-[#1A2542]">Showing 6 of 45 Lawyers</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-medium text-gray-500">Sort by:</span>
                                <div className="relative min-w-[180px]">
                                    <select className="w-full bg-[#F3F4F6] border border-gray-100 rounded-xl py-2.5 px-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium shadow-sm">
                                        <option>Most Relevant</option>
                                        <option>Top Rated</option>
                                        <option>Most Experienced</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Lawyer Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 items-stretch">
                            {LAWYERS.map((lawyer, idx) => (
                                <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 relative group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                    <button className="absolute top-6 right-6 text-[#1A2853] bg-[#EBF2FF] p-2 rounded-lg hover:bg-[#2563EB] hover:text-white transition-all z-10">
                                        <BookmarkIcon className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="relative w-20 h-20">
                                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                                                <Image
                                                    src={lawyer.image}
                                                    alt={lawyer.name}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm">
                                                <CheckBadgeIcon className="w-6 h-6 text-[#1A2853]" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#1A2542] mb-0.5">{lawyer.name}</h3>
                                            <p className="text-xs font-semibold text-gray-400 mb-1.5">{lawyer.title}</p>
                                            <div className="flex items-center gap-1">
                                                <StarIconSolid className="w-4 h-4 text-[#FFC107]" />
                                                <span className="text-xs font-bold text-[#1A2542]">{lawyer.rating}</span>
                                                <span className="text-[10px] font-semibold text-gray-400">({lawyer.reviewCount} Reviews)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {lawyer.tags.map((tag, tIdx) => (
                                            <span key={tIdx} className="px-3 py-1 bg-[#EBF2FF] text-[#1A2853] text-[9px] font-bold rounded-lg uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm font-semibold tracking-tight">{lawyer.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <BriefcaseIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm font-semibold tracking-tight">{lawyer.experience}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <LanguageIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            <span className="text-sm font-semibold tracking-tight">{lawyer.languages}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3 mt-auto">
                                        <button className="w-full border border-gray-200 hover:bg-gray-50 text-[#1A2542] font-bold py-3 rounded-xl transition-all shadow-sm">
                                            View Profile
                                        </button>
                                        <button className="w-full bg-[#1A2542] hover:bg-[#111827] text-white font-bold py-3 rounded-xl transition-all shadow-md">
                                            Contact Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-2">
                            <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all">
                                <ChevronLeftIcon className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-[#111827] text-white font-bold text-sm shadow-md">1</button>
                            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-[#1A2542] font-bold text-sm hover:bg-gray-50 transition-all">2</button>
                            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-[#1A2542] font-bold text-sm hover:bg-gray-50 transition-all">3</button>
                            <span className="px-2 text-gray-400 font-bold">...</span>
                            <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-[#1A2542] font-bold text-sm hover:bg-gray-50 transition-all">8</button>
                            <button className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all">
                                <ChevronRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
