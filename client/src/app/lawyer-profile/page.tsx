'use client';

import ProfileHeader from '@/components/lawyer-profile/ProfileHeader';
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
            <ProfileHeader />

            <main className="pt-42 pb-20 px-6 max-w-[1440px] mx-auto">
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

            {/* Footer simple for consistency */}
            <footer className="py-8 border-t border-gray-100 bg-white">
                <div className="max-w-[1440px] mx-auto px-16">
                    <p className="text-sm text-gray-400 font-medium text-left">© 2025 LEGAL.MU Lawfirm. All Rights Reserved</p>
                </div>
            </footer>
        </div>
    );
}
