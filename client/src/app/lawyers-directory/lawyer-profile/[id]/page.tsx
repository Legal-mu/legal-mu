'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/lawyer-profile/ProfileCard';
import AboutSection from '@/components/lawyer-profile/AboutSection';
import AwardsSection from '@/components/lawyer-profile/AwardsSection';
import InsightsSection from '@/components/lawyer-profile/InsightsSection';
import ReviewSection from '@/components/lawyer-profile/ReviewSection';
import RecommendationsSection from '@/components/lawyer-profile/RecommendationsSection';
import ContactSidebar from '@/components/lawyer-profile/ContactSidebar';
import api from '@/lib/api';

export default function LawyerProfilePage() {
    const params = useParams();
    const id = params?.id as string;

    const [lawyer, setLawyer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchLawyerProfile();
        }
    }, [id]);

    const fetchLawyerProfile = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await api.getLawyerById(id);

            if (response.success && response.data) {
                setLawyer(response.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch lawyer profile');
            console.error('Error fetching lawyer profile:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F6F8FF] font-jost selection:bg-blue-100">
                <Navbar />
                <main className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A2542]"></div>
                        <p className="mt-4 text-gray-600">Loading lawyer profile...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !lawyer) {
        return (
            <div className="min-h-screen bg-[#F6F8FF] font-jost selection:bg-blue-100">
                <Navbar />
                <main className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Profile</h2>
                        <p className="text-gray-600">{error || 'Lawyer not found'}</p>
                        <a
                            href="/lawyers-directory"
                            className="mt-6 inline-block bg-[#1A2542] text-white px-6 py-3 rounded-lg hover:bg-[#111827] transition-all"
                        >
                            Back to Directory
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F8FF] font-jost selection:bg-blue-100">
            <Navbar />

            <main className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[1fr_450px] gap-8 items-start">
                    {/* Left Column: Profile Card, About Section, Awards, Insights, and Reviews */}
                    <div className="space-y-8">
                        <ProfileCard lawyer={lawyer} />
                        <AboutSection lawyer={lawyer} />
                        <AwardsSection lawyer={lawyer} />
                        <InsightsSection lawyer={lawyer} />
                        <ReviewSection lawyer={lawyer} />
                        <RecommendationsSection lawyer={lawyer} />
                    </div>

                    {/* Right Column: Sidebar */}
                    <div>
                        <ContactSidebar lawyer={lawyer} />
                    </div>
                </div>

                {/* Full Width Sections */}
            </main>

            <Footer />
        </div>
    );
}