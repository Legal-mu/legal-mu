'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QAHero from '@/components/qa-tool/QAHero';
import QAAnalysis from '@/components/qa-tool/QAAnalysis';
import QASpecialistSection from '@/components/qa-tool/QASpecialistSection';

export default function QAToolPage() {
    return (
        <div className="min-h-screen bg-[#F6F8FF] font-jost">
            <Navbar />

            <main className="pt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. Hero Section */}
                <QAHero />

                {/* 2. Analysis Result Section */}
                <QAAnalysis />

                {/* 3. Specialist Recommendation Section */}
                <QASpecialistSection />
            </main>

            <Footer />
        </div>
    );
}
