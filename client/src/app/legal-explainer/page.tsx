'use client';

import ResourcesHeader from '@/components/resources/ResourcesHeader';
import LegalExplainerHero from '@/components/legal-explainer/LegalExplainerHero';
import FeaturedExplainer from '@/components/legal-explainer/FeaturedExplainer';
import CategoryFilters from '@/components/legal-explainer/CategoryFilters';
import VideoCard from '@/components/legal-explainer/VideoCard';
import LegalHelpCTA from '@/components/legal-explainer/LegalHelpCTA';

const videoData = [
    { title: "Understanding Contractual Liabilities in Fintech", views: "1.2k", date: "2 days ago" },
    { title: "Understanding Contractual Liabilities in Fintech", views: "1.2k", date: "2 days ago" },
    { title: "Understanding Contractual Liabilities in Fintech", views: "1.2k", date: "2 days ago" },
    { title: "Understanding Contractual Liabilities in Fintech", views: "1.2k", date: "2 days ago" },
    { title: "Understanding Contractual Liabilities in Fintech", views: "1.2k", date: "2 days ago" },
    { title: "Understanding Contractual Liabilities in Fintech", views: "1.2k", date: "2 days ago" },
];

export default function LegalExplainerPage() {
    return (
        <div className="min-h-screen bg-[#F6F8FF] font-jost">
            <ResourcesHeader activeResource="Videos Explainers" />

            <main className="pt-40 px-4 sm:px-8 lg:px-12">
                {/* 1. Hero Section */}
                <LegalExplainerHero />

                {/* 2. Featured Explainer */}
                <FeaturedExplainer />

                {/* 3. Category Filters */}
                <CategoryFilters />

                {/* 4. Video Grid */}
                <section className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                    {videoData.map((video, idx) => (
                        <VideoCard key={idx} {...video} />
                    ))}
                </section>

                {/* 5. CTA Section and Footer */}
                <LegalHelpCTA />
            </main>

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
