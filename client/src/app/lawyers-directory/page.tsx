'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
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

interface LawyerProfile {
    id: string;
    fullLegalName: string;
    title: string;
    firmName: string;
    city: string;
    address: string;
    phoneNumber: string;
    practiceAreas: string[];
    experienceYears: number;
    languages: string[];
    biography: string;
    extendedBiography: string;
    headshotUrl: string;
}

interface Lawyer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    lawyerProfile: LawyerProfile;
}

export default function LawyersDirectoryPage() {
    const [lawyers, setLawyers] = useState<Lawyer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 6;

    // Filter state (applied filters that trigger API calls)
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [practiceArea, setPracticeArea] = useState('');
    const [experienceYears, setExperienceYears] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');

    // Pending filters (not yet applied, only used for UI state)
    const [pendingPracticeArea, setPendingPracticeArea] = useState('');
    const [pendingExperienceYears, setPendingExperienceYears] = useState('');

    // Selected filters for checkboxes (UI state only)
    const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>([]);
    const [selectedExperience, setSelectedExperience] = useState('');

    // Fetch lawyers whenever filters or page changes
    useEffect(() => {
        fetchLawyers();
    }, [currentPage, searchTerm, location, practiceArea, experienceYears, sortBy]);

    const fetchLawyers = async () => {
        try {
            setLoading(true);
            setError('');

            const params: any = {
                page: currentPage,
                limit,
            };

            if (searchTerm) params.search = searchTerm;
            if (location) params.location = location;
            if (practiceArea) params.practiceArea = practiceArea;
            if (experienceYears) params.experienceYears = parseInt(experienceYears);
            if (sortBy) params.sortBy = sortBy;

            const response = await api.getApprovedLawyers(params);

            if (response.success && response.data) {
                setLawyers(response.data.lawyers);
                setTotal(response.data.pagination.total);
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch lawyers');
            console.error('Error fetching lawyers:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page on search
        fetchLawyers();
    };

    const handleApplyFilters = () => {
        // Apply pending filters to actual filter state
        setPracticeArea(pendingPracticeArea);
        setExperienceYears(pendingExperienceYears);
        setCurrentPage(1); // Reset to first page on filter
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setLocation('');
        setPracticeArea('');
        setExperienceYears('');
        setPendingPracticeArea('');
        setPendingExperienceYears('');
        setSelectedPracticeAreas([]);
        setSelectedExperience('');
        setCurrentPage(1);
    };

    const togglePracticeArea = (area: string) => {
        if (selectedPracticeAreas.includes(area)) {
            setSelectedPracticeAreas(selectedPracticeAreas.filter(a => a !== area));
            setPendingPracticeArea('');
        } else {
            setSelectedPracticeAreas([area]); // Single selection for now
            setPendingPracticeArea(area);
        }
    };

    const handleExperienceChange = (exp: string) => {
        setSelectedExperience(exp);
        if (exp === 'Any') {
            setPendingExperienceYears('');
        } else {
            const years = parseInt(exp.replace('+', '').replace(' years', ''));
            setPendingExperienceYears(years.toString());
        }
    };

    const getImageUrl = (url: string | null | undefined) => {
        if (!url) return '/images/placeholder-avatar.jpg';
        if (url.startsWith('http')) return url;
        return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}${url}`;
    };

    return (
        <div className="min-h-screen bg-[#F8F9FD]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-44 pb-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A2550] mb-6 tracking-tight font-jost">
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-grow bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-500 text-lg font-medium font-jost"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-[#1A2542] hover:bg-[#111827] text-white px-8 py-3 rounded-[1rem] font-bold transition-all ml-2 whitespace-nowrap font-jost"
                            >
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
                                <h2 className="text-2xl font-bold text-[#1A2542] normal-case font-jost">Filters</h2>
                                <button
                                    onClick={handleClearFilters}
                                    className="text-sm font-semibold text-[#1A2542] hover:text-[#1A2542] tracking-tight normal-case font-jost"
                                >
                                    Clear all
                                </button>
                            </div>

                            {/* Location */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-[#1A2542] mb-4 normal-case font-jost">Location</h3>
                                <div className="relative">
                                    <select
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full bg-[#F3F4F6] border-none rounded-2xl py-3.5 px-5 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-400 font-medium lowercase font-jost"
                                    >
                                        <option value="">All cities</option>
                                        <option value="Port Louis">Port Louis</option>
                                        <option value="Grand Baie">Grand Baie</option>
                                        <option value="Curepipe">Curepipe</option>
                                        <option value="Quatre Bornes">Quatre Bornes</option>
                                        <option value="Vacoas">Vacoas</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Practice Area */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-[#1A2542] mb-4 normal-case font-jost">Practice Area</h3>
                                <div className="space-y-3">
                                    {["Corporate Law", "Family Law", "Criminal Defense", "Real Estate", "Immigration"].map((area, idx) => (
                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group normal-case">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPracticeAreas.includes(area)}
                                                    onChange={() => togglePracticeArea(area)}
                                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                                                />
                                            </div>
                                            <span className="text-gray-600 font-medium group-hover:text-[#1A2542] transition-colors font-jost">{area}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-[#1A2542] mb-4 normal-case font-jost">Experience</h3>
                                <div className="space-y-3">
                                    {["Any", "5+ years", "10+ years", "20+ years"].map((exp, idx) => (
                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group normal-case">
                                            <input
                                                type="radio"
                                                name="experience"
                                                checked={selectedExperience === exp}
                                                onChange={() => handleExperienceChange(exp)}
                                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            />
                                            <span className="text-gray-600 font-medium group-hover:text-[#1A2542] transition-colors font-jost">{exp}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleApplyFilters}
                                className="w-full bg-[#1A2542] hover:bg-[#111827] text-white font-bold py-3 rounded-xl transition-all shadow-lg text-lg normal-case font-jost"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-[#1A2542] font-jost">
                                {loading ? 'Loading...' : `Showing ${lawyers.length} of ${total} Lawyers`}
                            </h2>
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-medium text-gray-500 font-jost">Sort by:</span>
                                <div className="relative min-w-[180px]">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full bg-[#F3F4F6] border border-gray-100 rounded-xl py-2.5 px-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium shadow-sm font-jost"
                                    >
                                        <option value="createdAt">Most Relevant</option>
                                        <option value="experience">Most Experienced</option>
                                    </select>
                                    <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                                {error}
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A2542]"></div>
                            </div>
                        )}

                        {/* No Results */}
                        {!loading && lawyers.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-500 font-jost">No lawyers found matching your criteria.</p>
                            </div>
                        )}

                        {/* Lawyer Grid */}
                        {!loading && lawyers.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 items-stretch">
                                    {lawyers.map((lawyer) => (
                                        <div key={lawyer.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 relative group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                            <button className="absolute top-6 right-6 text-[#1A2853] bg-[#EBF2FF] p-2 rounded-lg hover:bg-[#2563EB] hover:text-white transition-all z-10">
                                                <BookmarkIcon className="w-5 h-5" />
                                            </button>

                                            <div className="flex items-center gap-4 mb-5">
                                                <div className="relative w-20 h-20">
                                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                                                        <Image
                                                            src={getImageUrl(lawyer.lawyerProfile?.headshotUrl || lawyer.avatar)}
                                                            alt={`${lawyer.firstName} ${lawyer.lastName}`}
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
                                                    <h3 className="text-lg font-bold text-[#1A2542] mb-0.5 font-jost">
                                                        {lawyer.lawyerProfile?.fullLegalName || `${lawyer.firstName} ${lawyer.lastName}`}
                                                    </h3>
                                                    <p className="text-xs font-semibold text-gray-400 mb-1.5 font-jost">
                                                        {lawyer.lawyerProfile?.title || 'Attorney'}
                                                    </p>
                                                    <div className="flex items-center gap-1">
                                                        <StarIconSolid className="w-4 h-4 text-[#FFC107]" />
                                                        <span className="text-xs font-bold text-[#1A2542] font-jost">5.0</span>
                                                        <span className="text-[10px] font-semibold text-gray-400 font-jost">(0 Reviews)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {lawyer.lawyerProfile?.practiceAreas?.slice(0, 3).map((area, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-[#EBF2FF] text-[#1A2853] text-[9px] font-bold rounded-lg uppercase tracking-wider font-jost">
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-3 mb-8">
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <MapPinIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                    <span className="text-sm font-semibold tracking-tight font-jost">
                                                        {lawyer.lawyerProfile?.city || 'Mauritius'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <BriefcaseIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                    <span className="text-sm font-semibold tracking-tight font-jost">
                                                        {lawyer.lawyerProfile?.experienceYears
                                                            ? `${lawyer.lawyerProfile.experienceYears}+ years experience`
                                                            : 'Experienced Professional'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <LanguageIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                    <span className="text-sm font-semibold tracking-tight font-jost">
                                                        {lawyer.lawyerProfile?.languages?.join(', ') || 'English, French'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="space-y-3 mt-auto">
                                                <Link
                                                    href={`/lawyers-directory/lawyer-profile/${lawyer.id}`}
                                                    className="w-full border border-gray-200 hover:bg-gray-50 text-[#1A2542] font-bold py-3 rounded-xl transition-all shadow-sm font-jost text-center block"
                                                >
                                                    View Profile
                                                </Link>
                                                <button className="w-full bg-[#1A2542] hover:bg-[#111827] text-white font-bold py-3 rounded-xl transition-all shadow-md font-jost">
                                                    Contact Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeftIcon className="w-4 h-4" />
                                        </button>

                                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all font-jost ${currentPage === pageNum
                                                        ? 'bg-[#111827] text-white shadow-md'
                                                        : 'bg-white border border-gray-200 text-[#1A2542] hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        {totalPages > 5 && currentPage < totalPages - 2 && (
                                            <>
                                                <span className="px-2 text-gray-400 font-bold font-jost">...</span>
                                                <button
                                                    onClick={() => setCurrentPage(totalPages)}
                                                    className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-[#1A2542] font-bold text-sm hover:bg-gray-50 transition-all font-jost"
                                                >
                                                    {totalPages}
                                                </button>
                                            </>
                                        )}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}