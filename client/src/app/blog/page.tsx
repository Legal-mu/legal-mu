'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { CTASection, PracticeAreaHeader } from '@/components/practice-area';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FF] font-jost">
      <PracticeAreaHeader />

      <main className="pt-40 pb-16 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Hero */}
        <section className="mb-14">
          <h1 className="text-[56px] font-bold text-[#111827] leading-[110%] mb-4">
            Editorial Directory
          </h1>
          <p className="max-w-[820px] text-[16px] md:text-[18px] text-[#6B7280] leading-[160%] mb-8">
            Authoritative legal analysis, scholarly insights, and regulatory intelligence for
            the Mauritian legal professional and general public.
          </p>

          {/* Search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 max-w-[520px]">
            <div className="flex-1 relative bg-white border border-gray-200 rounded-xl shadow-sm">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Authors, Topics or Keywords"
                className="w-full pl-11 pr-4 py-3 bg-transparent outline-none text-sm text-[#111827] placeholder:text-gray-400"
              />
            </div>
            <button className="h-[48px] px-6 rounded-xl bg-[#1A2853] text-white text-sm font-semibold hover:bg-[#2A3B73] transition-colors">
              Search
            </button>
          </div>
        </section>

        {/* Featured Analysis */}
        <section className="bg-white rounded-[32px] rounded-tl-none shadow-sm border border-gray-100 overflow-hidden relative">
          {/* Tag in corner */}
          <div className="absolute top-0 left-0 flex items-center gap-4">
            <div className="w-[12px] h-16 bg-[#1A2853]" />
            <p className="text-[12px] font-bold tracking-[0.3em] text-[#111827] uppercase pt-2">
              Featured Analysis
            </p>
          </div>

          <div className="p-8 md:p-12 pt-24 md:pt-32">

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
              {/* Copy */}
              <div>
                <h2 className="text-[34px] md:text-[40px] font-bold text-[#111827] leading-[115%] mb-6">
                  Navigating the 2024
                  <br />
                  Mauritius Companies Act
                  <br />
                  Amendments
                </h2>

                <div className="space-y-6 text-[15px] md:text-[16px] text-[#6B7280] leading-[180%] max-w-[640px]">
                  <p>
                    As Mauritius strengthens its position as international financial center,
                    significant changes to disclosure requirements and board responsibilities have
                    been introduced. This comprehensive analysis delves into the implications for
                    both domestic and off shore entities.
                  </p>
                  <p>
                    Our senior legal analysts provide a roadmap for compliance, highlighting the
                    critical windows for reporting and the increased penalties for non-adherence.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EEF2FF]">
                  <Image
                    src="/info_hub.jpg"
                    alt="Featured legal analysis"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer row */}
          <div className="border-t border-gray-100 px-8 md:px-12 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-wrap items-center gap-10 text-[11px] text-gray-500">
                <div>
                  <div className="font-semibold tracking-widest uppercase mb-1">Author</div>
                  <div className="text-[#111827] font-semibold text-[12px]">Adv. Behram Khan</div>
                </div>
                <div>
                  <div className="font-semibold tracking-widest uppercase mb-1">Time</div>
                  <div className="text-[#111827] font-semibold text-[12px]">14 minutes read</div>
                </div>
              </div>

              <Link
                href="/blog/navigating-the-2024-mauritius-companies-act-amendments"
                className="inline-flex items-center justify-center gap-2 px-6 h-[44px] rounded-xl border border-[#CBD5E1] bg-white text-[#111827] text-sm font-semibold hover:border-[#94A3B8] transition-colors w-full md:w-auto"
              >
                Read Full Analysis
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Below fold: Latest publications + Sidebar */}
        <section className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            {/* Latest Publications */}
            <div>
              <div className="mb-8">
                <h3 className="text-[22px] md:text-[24px] font-bold text-[#1A2853]">
                  Latest Publications:
                </h3>
                <div className="h-[2px] bg-[#1A2853]/70 w-[360px] sm:w-[520px] md:w-[720px] mt-2" />
              </div>

              <div className="divide-y divide-gray-200/70 rounded-2xl bg-[#F6F8FF]">
                {[
                  {
                    date: '14 JULY, 2025',
                    category: 'PROPERTY LAW',
                    title: 'Key Considerations For Foreign Nationals Buying Property in Mauritius',
                    excerpt:
                      'The acquisition of real estate by non-citizens is governed by the Non-Citizens Act. This article explores the various schemes available, including the Property Development Scheme…...',
                    author: 'Adv. Hamza Ahsen',
                  },
                  {
                    date: '14 JULY, 2025',
                    category: 'PROPERTY LAW',
                    title: 'Key Considerations For Foreign Nationals Buying Property in Mauritius',
                    excerpt:
                      'The acquisition of real estate by non-citizens is governed by the Non-Citizens Act. This article explores the various schemes available, including the Property Development Scheme…...',
                    author: 'Adv. Hamza Ahsen',
                  },
                  {
                    date: '14 JULY, 2025',
                    category: 'PROPERTY LAW',
                    title: 'Key Considerations For Foreign Nationals Buying Property in Mauritius',
                    excerpt:
                      'The acquisition of real estate by non-citizens is governed by the Non-Citizens Act. This article explores the various schemes available, including the Property Development Scheme…...',
                    author: 'Adv. Hamza Ahsen',
                  },
                ].map((post, idx) => (
                  <article key={idx} className="py-10">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-10 items-start">
                      <div className="pl-2">
                        <div className="text-[11px] tracking-widest text-gray-500 font-semibold uppercase mb-3">
                          {post.date} <span className="mx-2 text-gray-300">/</span> {post.category}
                        </div>
                        <h4 className="text-[20px] md:text-[22px] font-bold text-[#1A2853] leading-[135%] mb-3 max-w-[560px]">
                          {post.title}
                        </h4>
                        <p className="text-[14px] md:text-[15px] text-[#6B7280] leading-[185%] max-w-[600px] mb-5">
                          {post.excerpt}
                        </p>
                        <p className="text-[13px] text-[#1A2853] font-medium italic">
                          by <span className="font-semibold">{post.author}</span>
                        </p>
                      </div>

                      <div className="md:pr-2">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200/70">
                          <Image
                            src="/publication-placeholder.png"
                            alt="Publication thumbnail"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Trending Topics */}
              <div>
                <div className="flex items-center gap-2 text-[#1A2853] font-bold text-[14px] mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#1A2853]">
                    <path
                      d="M3 17l6-6 4 4 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 8h6v6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Trending Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {['TAXATION', 'MARITIME', 'CORPORATE', 'IP LAW', 'EDUCATIONAL LEGALITY'].map((t) => (
                    <button
                      key={t}
                      className="px-3.5 py-2 rounded-lg border border-[#1A2853]/30 bg-white text-[#1A2853] text-[11px] font-semibold tracking-widest hover:border-[#1A2853]/50 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor's Pick */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <div className="flex items-center gap-2 text-[#1A2853] font-bold text-[14px] mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#1A2853]">
                    <path
                      d="M12 3l2.2 6.3H21l-5.2 3.8L17.9 21 12 16.9 6.1 21l2.1-7.9L3 9.3h6.8L12 3z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Editor&apos;s Pick
                </div>

                <div className="space-y-6">
                  {[
                    { title: 'The Evolution of the Civil Code in Modern Jurisprudence', date: 'April 2025' },
                    { title: 'The Evolution of the Civil Code in Modern Jurisprudence', date: 'April 2025' },
                  ].map((p, i) => (
                    <div key={i}>
                      <div className="text-[#111827] text-[14px] font-bold leading-[150%] mb-2">
                        {p.title}
                      </div>
                      <div className="text-[12px] text-gray-500">{p.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-[32px] md:text-[36px] font-bold text-[#111827] mb-3">
                  Need Professional Legal Help?
                </h2>
                <p className="text-[15px] md:text-[16px] text-[#6B7280] leading-relaxed">
                  Our Legal Information Hub provides the foundation for personalized representation and advice, connect with verified specialists in our lawyer&apos;s directory.
                </p>
              </div>
              <Link
                href="/lawyers"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A2853] text-white rounded-xl text-sm font-semibold hover:bg-[#2A3B73] transition-all shadow-sm whitespace-nowrap"
              >
                Find a Lawyer
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <p className="text-sm text-gray-400 font-medium">
            © 2025 LEGAL.MU Lawfirm. All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

