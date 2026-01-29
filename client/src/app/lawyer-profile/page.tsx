'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/lawyer-profile/ProfileCard';
import AboutSection from '@/components/lawyer-profile/AboutSection';
import AwardsSection from '@/components/lawyer-profile/AwardsSection';
import InsightsSection from '@/components/lawyer-profile/InsightsSection';
import ReviewSection from '@/components/lawyer-profile/ReviewSection';
import RecommendationsSection from '@/components/lawyer-profile/RecommendationsSection';
import ContactSidebar from '@/components/lawyer-profile/ContactSidebar';

export default function LawyerProfilePage() {
    return (
        <div className="min-h-screen bg-[#F6F8FF] font-jost selection:bg-blue-100">
            <Navbar />

            <main className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[1fr_450px] gap-8 items-start">
                    {/* Left Column: Profile Card, About Section, Awards, Insights, and Reviews */}
                    <div className="space-y-8">
                        <ProfileCard />
                        <AboutSection />
                        <AwardsSection />
                        <InsightsSection />
                        <ReviewSection />
                        <RecommendationsSection />
                    </div>

                    {/* Right Column: Sidebar */}
                    <div>
                        <ContactSidebar />
                    </div>
                </div>

                {/* Full Width Sections */}
            </main>

            <Footer />
        </div>
    );
}
