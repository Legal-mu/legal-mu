'use client';

import { useParams } from 'next/navigation';
import { PracticeAreaHeader, CTASection, PracticeDetailHero, HighlightsBar, FrameworkSection, PracticeAreaCard } from '@/components/practice-area';

// Mock data mirrored from main page, plus detail-specific content if needed
const practiceAreasData = [
    { id: 'family-law', title: 'Family Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Personal Law' },
    { id: 'criminal-law', title: 'Criminal Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Personal Law' },
    { id: 'employment-law', title: 'Employment Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Financial Law' },
    { id: 'corporate-law', title: 'Corporate Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Financial Law' },
    { id: 'tax-law', title: 'Tax Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Financial Law' },
    { id: 'civil-law', title: 'Civil Law', description: 'Explore specialized legal guidance for civil disputes and private law matters in Mauritius. Access detailed resources and expert representation for your specific legal needs.', category: 'Personal Law' },
    { id: 'criminal-law-2', title: 'Criminal Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Personal Law' },
    { id: 'employment-law-2', title: 'Employment Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Financial Law' },
    { id: 'corporate-law-2', title: 'Corporate Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Property Law' },
    { id: 'tax-law-2', title: 'Tax Law', description: 'Mauritian Civil Code: Divorce, custody, and domestic law', category: 'Public Law' },
];

export default function PracticeAreaDetail() {
    const params = useParams();
    // In a real app, use the ID to fetch specific data. For now, find it or default to Civil Law content for demo.
    const id = params?.id as string;
    const currentArea = practiceAreasData.find(p => p.id === id) || practiceAreasData[5]; // Default to Civil Law if not found or for demo

    // Enhanced description for Hero if it's our target demo
    const description = id === 'civil-law' || !id
        ? "Explore specialized legal guidance for civil disputes and private law matters in Mauritius. Access detailed resources and expert representation for your specific legal needs."
        : currentArea.description;

    return (
        <div className="min-h-screen bg-[#F6F8FF] font-jost">
            <PracticeAreaHeader />

            <main className="pt-40 pb-16">
                <div className="max-w-[1440px] mx-auto px-6 mb-12">
                    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                        {/* Hero Section */}
                        <PracticeDetailHero
                            title={currentArea.title}
                            description={description}
                        />
                        {/* Highlights Bar */}
                        <HighlightsBar title={currentArea.title} />
                    </div>
                </div>

                <div className="max-w-[1440px] mx-auto px-2">
                    {/* Key Sections Framework */}
                    <FrameworkSection />

                    {/* Specialized Sub Categories */}
                    <div className="mt-20 mb-12">
                        <h2 className="text-2xl font-bold text-[#1A2853] mb-8">Specialized Sub Categories</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {practiceAreasData.slice(0, 10).map((area) => (
                                <PracticeAreaCard
                                    key={area.id}
                                    id={area.id}
                                    title={area.title}
                                    description={area.description} // Short description for cards
                                    href={`/practice-area/${area.id}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
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
