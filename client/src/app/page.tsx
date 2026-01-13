'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/landing/Hero';
import ActionCards from '@/components/landing/ActionCards';
import Stats from '@/components/landing/Stats';
import PracticeAreas from '@/components/landing/PracticeAreas';
import QuoteSection from '@/components/landing/QuoteSection';
import LawyerShowcase from '@/components/landing/LawyerShowcase';
import Testimonials from '@/components/landing/Testimonials';
import BlogSection from '@/components/landing/BlogSection';
import ContactSection from '@/components/landing/ContactSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-blue-100">
      <Navbar />

      <main className="pt-28 pb-12 px-6 max-w-7xl mx-auto overflow-hidden">
        <Hero />
        <ActionCards />
        <Stats />
        <PracticeAreas />
        <QuoteSection />
        <LawyerShowcase />
        <BlogSection />
        <Testimonials />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
