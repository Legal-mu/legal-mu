'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src="/logo.png" alt="Legal.mu Logo" width={220} height={60} className="object-contain" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-1 border border-gray-200 rounded-full px-2 py-1.5 bg-white/50 backdrop-blur-md shadow-sm">
              <Link href="#" className="px-6 py-2 text-sm font-medium text-[#1e3a8a] hover:bg-blue-50 rounded-full transition-colors">Home</Link>
              <Link href="#" className="px-6 py-2 text-sm font-medium text-[#64748b] hover:text-[#1e3a8a] hover:bg-gray-50 rounded-full transition-colors">Legal Services</Link>
              <Link href="#" className="px-6 py-2 text-sm font-medium text-[#64748b] hover:text-[#1e3a8a] hover:bg-gray-50 rounded-full transition-colors">Community</Link>
              <Link href="#" className="px-6 py-2 text-sm font-medium text-[#64748b] hover:text-[#1e3a8a] hover:bg-gray-50 rounded-full transition-colors">Resources</Link>
            </div>
          </nav>

          <div className="w-[140px] hidden md:block">
            {/* Spacer */}
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Top Section: Stacked Content */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end mb-12">
          {/* Left: Heading */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eff6ff] text-[#2563eb] text-sm font-medium border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
              <span>Top Rated in Mauritius</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              <span className="text-[#1e3a8a]">DEFENDING</span>
              <br />
              <span className="text-[#1e3a8a]">YOUR</span>
              <br />
              <i className="font-serif text-black italic pr-3">RIGHTS</i>
              <span className="text-[#1e3a8a]">WITH</span>
              <br />
              <span className="text-[#2563eb]">PRECISION</span>
            </h1>
          </div>

          {/* Right: Subtext & Trust (Aligned to bottom of grid) */}
          <div className="pb-2 space-y-8">
            <p className="text-lg text-[#64748b] leading-relaxed max-w-md">
              A legacy of justice built on trust and results. Expert representation for your peace of mind.
            </p>

            <div className="h-px bg-gray-200 w-full"></div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-white overflow-hidden relative">
                  <Image src="/avatar1.png" alt="Client 1" fill className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-white overflow-hidden relative">
                  <Image src="/avatar2.png" alt="Client 2" fill className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 overflow-hidden relative flex items-center justify-center text-[10px] font-bold text-blue-800">
                  +500
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex text-yellow-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-sm text-[#64748b] font-medium">Trusted by many clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Hero Image Card */}
        <div className="relative w-full h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl group mb-16">
          <Image
            src="/lady_justice_landscape.png"
            alt="Bronze Lady Justice Statue"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>

          {/* Overlay Content */}
          <div className="absolute inset-0 p-10 flex items-center justify-end">
            <div className="max-w-md flex flex-col items-end text-right space-y-8">
              {/* Badge */}
              <div className="px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase">
                Access to Justice
              </div>

              {/* Quote */}
              <blockquote className="text-white text-2xl lg:text-3xl font-serif font-medium leading-snug drop-shadow-xl">
                &quot;Justice consists not in being neutral between right and wrong, but in finding out the right and upholding it.&quot;
              </blockquote>

              {/* Search Bar */}
              <div className="bg-white rounded-full p-2 pl-6 flex items-center gap-3 w-full shadow-2xl transform transition-transform hover:scale-[1.02]">
                <MagnifyingGlassIcon className="w-5 h-5 text-[#2563eb]" />
                <input
                  type="text"
                  placeholder="Search area of law..."
                  className="flex-1 bg-transparent border-none outline-none text-[#111827] placeholder-gray-400 text-sm h-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Hire a Lawyer Card */}
          <div className="bg-[#2563eb] rounded-[2rem] p-12 flex justify-between items-start group cursor-pointer hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div>
                <h3 className="text-white text-3xl font-bold mb-3">Hire a Lawyer</h3>
                <p className="text-blue-100 text-base font-medium max-w-xs">Get expert legal defense for your case today with our verified professionals.</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#2563eb] transition-all">
              <ArrowUpRightIcon className="w-6 h-6" />
            </div>
          </div>

          {/* Join as Lawyer Card */}
          <div className="bg-[#f8fafc] border border-gray-200 rounded-[2rem] p-12 flex justify-between items-start group cursor-pointer hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] flex items-center justify-center text-[#2563eb]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[#111827] text-3xl font-bold mb-3">Join as a Lawyer</h3>
                <p className="text-[#64748b] text-base font-medium max-w-xs">Grow your practice and connect with clients in need of your expertise.</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#64748b] group-hover:bg-[#1e3a8a] group-hover:text-white transition-all">
              <ArrowUpRightIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}