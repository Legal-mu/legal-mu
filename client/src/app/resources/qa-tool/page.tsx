'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function QAToolPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A2542] mb-8">Q&A Tool</h1>
                    <p className="text-xl text-gray-600">Get answers to your legal questions using our interactive Q&A tool.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
