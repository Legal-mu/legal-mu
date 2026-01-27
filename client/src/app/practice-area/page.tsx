'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { PracticeAreaHeader, CategoryFilter, PracticeAreaCard, Pagination, CTASection } from '@/components/practice-area';

// Mock data for practice areas
const practiceAreas = [
    { id: 'family-law', title: 'Family Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Personal Law' },
    { id: 'criminal-law', title: 'Criminal Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Personal Law' },
    { id: 'employment-law', title: 'Employement Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Financial Law' },
    { id: 'corporate-law', title: 'Corporate Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Financial Law' },
    { id: 'tax-law', title: 'Tax Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Financial Law' },
    { id: 'civil-law', title: 'Civil Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Personal Law' },
    { id: 'criminal-law-2', title: 'Criminal Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Personal Law' },
    { id: 'employment-law-2', title: 'Employement Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Financial Law' },
    { id: 'corporate-law-2', title: 'Corporate Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Property Law' },
    { id: 'tax-law-2', title: 'Tax Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Public Law' },
];

const categories = ['All Areas', 'Personal Law', 'Financial Law', 'Property Law', 'Public Law'];

export default function PracticeAreaPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All Areas');

    const filteredAreas = selectedCategory === 'All Areas'
        ? practiceAreas
        : practiceAreas.filter(area => area.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#F6F8FF] font-jost">
            <PracticeAreaHeader />

            <main className="pt-40 pb-8 max-w-[1440px] mx-auto">
                {/* Back Link */}
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#E2E8F0] rounded-lg text-[#1A2853] text-sm font-bold mb-8 hover:bg-[#CBD5E1] transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 stroke-2" />
                    Back To Information Hub
                </Link>

                {/* Hero Section */}
                <div className="mb-8">
                    <h1 className="text-[56px] font-bold text-[#111827] leading-[110%] mb-4">
                        Expert Legal Guidance By Practice <span className="block">Area</span>
                    </h1>
                    <p className="max-w-[700px] text-[18px] text-[#6B7280] leading-[160%]">
                        Navigate through our comprehensive directory of Mauritian Law Categories.
                        Access specialized articles, videos and professional help tailored to your
                        specific legal needs.
                    </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <CategoryFilter
                        categories={categories}
                        defaultSelected={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-[#1A2853]/30 transition-colors">
                            Alphabetical
                            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Practice Areas Grid - 5 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
                    {filteredAreas.map((area) => (
                        <PracticeAreaCard
                            key={area.id}
                            id={area.id}
                            title={area.title}
                            description={area.description}
                            href={`/practice-area/${area.id}`}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={8}
                    onPageChange={setCurrentPage}
                />
            </main>

            {/* CTA Section */}
            <CTASection />

            {/* Footer */}
            <footer className="py-8 border-t border-gray-100 bg-white">
                <div className="max-w-[1440px] mx-auto px-20">
                    <p className="text-sm text-gray-400 font-medium">
                        © 2025 LEGAL.MU Lawfirm. All Rights Reserved
                    </p>
                </div>
            </footer>
        </div>
    );
}
