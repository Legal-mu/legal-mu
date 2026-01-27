'use client';

import ResourcesHeader from '@/components/resources/ResourcesHeader';
import QAHero from '@/components/qa-tool/QAHero';
import QAAnalysis from '@/components/qa-tool/QAAnalysis';
import QASpecialistSection from '@/components/qa-tool/QASpecialistSection';

export default function QAToolPage() {
    return (
        <div className="min-h-screen bg-[#F6F8FF] font-jost">
            <ResourcesHeader activeResource="Q&A Tool" />

            <main className="pt-40">
                {/* 1. Hero Section */}
                <QAHero />

                {/* 2. Analysis Result Section */}
                <QAAnalysis />

                {/* 3. Specialist Recommendation Section */}
                <QASpecialistSection />
            </main>

            {/* Footer - Consistent with Legal Explainer and Practice Area pages */}
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
