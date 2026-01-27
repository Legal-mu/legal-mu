'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { PracticeAreaHeader } from '@/components/practice-area';

export default function CompaniesActArticlePage() {
  return (
    <div className="min-h-screen bg-[#F6F8FF] font-jost">
      <PracticeAreaHeader />

      <main className="pt-40 pb-24 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-bold text-[#1A2853] px-4 py-1.5 rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E1] transition-all"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 stroke-[3]" />
            Back To Editorial Directory
          </Link>
        </div>

        {/* Title + Download section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <h1 className="text-[48px] md:text-[56px] leading-[110%] font-bold text-[#1A2853] max-w-[850px]">
            Navigating the 2024 Mauritius Companies Act Amendments
          </h1>

          <button className="flex items-center gap-3 text-[#64748B] hover:text-[#1A2853] transition-colors mb-4 uppercase tracking-[0.15em] font-bold text-[13px]">
            Download
            <div className="w-7 h-7 rounded-full border border-[#64748B] flex items-center justify-center">
              <ArrowDownTrayIcon className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Info Bar */}
        <div className="border-t border-b border-gray-200 py-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[12px] tracking-[0.15em] uppercase text-[#6B7280]">
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src="/avatar1.png"
                  alt="Adv. Behram Khan"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="text-[#111827] font-bold normal-case text-[15px] mb-0.5">
                  Adv. Behram Khan
                </div>
                <div className="font-medium text-[10px] opacity-70">Senior Legal Consultant</div>
              </div>
            </div>

            {/* Published */}
            <div className="md:text-center self-center">
              <div className="mb-2 opacity-70">Published</div>
              <div className="text-[#111827] font-bold normal-case text-[15px] tracking-normal cursor-default">
                Oct 13th, 2024
              </div>
            </div>

            {/* Read Time */}
            <div className="md:text-right self-center">
              <div className="mb-2 opacity-70">Read Time</div>
              <div className="text-[#111827] font-bold normal-case text-[15px] tracking-normal cursor-default">
                14 Minutes
              </div>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <section className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] gap-12 lg:gap-12">
          {/* Left sidebar: contents + share */}
          <aside className="space-y-10 text-[13px]">
            {/* Contents */}
            <div>
              <h2 className="text-[12px] md:text-[16px] font-bold tracking-[0.12em] text-[#6B7280] uppercase mb-8">
                Contents
              </h2>
              <div className="flex gap-8">
                {/* Vertical Indicator Bar */}
                <div className="relative w-[6px] bg-white border border-[#111827] rounded-full h-[190px] self-stretch mt-1 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-10 bg-[#1A2853] rounded-full transition-all duration-300"
                    style={{ top: '0px' }} // Position for 'Introduction'
                  />
                </div>

                {/* Contents List */}
                <div className="flex flex-col gap-5 text-[15px] font-medium">
                  {['Introduction', 'Disclosure Rules', 'Board Obligations', 'Penalty Framework', 'Conclusion'].map(
                    (item, index) => (
                      <button
                        key={item}
                        className={`block text-left transition-colors duration-200 ${index === 0
                          ? 'font-bold text-[#1A2853]'
                          : 'text-[#6B7280] hover:text-[#1A2853]'
                          }`}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="space-y-3">
              <h2 className="text-[12px] font-bold tracking-[0.18em] text-[#6B7280] uppercase">
                Share
              </h2>
              <div className="space-y-2 text-[13px] text-[#1A2853]">
                {['LinkedIn', 'Twitter', 'Email'].map((label) => (
                  <button
                    key={label}
                    className="flex items-center gap-2 text-[#1A2853] hover:underline"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#CBD5E1] text-[11px]">
                      {label[0]}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Article body */}
          <article className="space-y-7 text-[15px] md:text-[16px] leading-[190%] text-[#111827]">
            <p className="border-l-4 border-[#1A2853] pl-5 text-[#1F2933] text-[15px] md:text-[16px] leading-[190%]">
              As Mauritius continues to refine its legislative framework to meet international
              transparency standards, the 2024 amendments to the Companies Act mark a significant
              pivot in corporate governance.
            </p>

            <p>
              The Mauritian financial landscape has undergone a paradigm shift. With the recent
              gazetting of the Companies (Amendment) Act 2024, practitioners and directors alike
              find themselves navigating a more rigorous landscape of accountability. These
              changes are not merely administrative; they represent a fundamental realignment with
              the OECD and FATF requirements.
            </p>

            <p>
              From enhanced disclosure rules to expanded board duties, the amendments usher in a new
              era of transparency. Foreign companies and global business entities operating in
              Mauritius must reassess their governance structures, reporting workflows, and internal
              controls to ensure timely compliance.
            </p>

            <div className="my-8">
              <div className="relative w-full max-w-[720px] mx-auto rounded-2xl overflow-hidden shadow-md">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/info_hub.jpg"
                    alt="Scales of justice and legal books"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <p>
              For boards, the emphasis on demonstrable oversight is sharper than ever. Directors
              are expected to maintain an auditable trail of decision-making, risk assessments, and
              conflict-of-interest disclosures. Failure to do so exposes both the company and its
              officers to heightened regulatory sanctions and reputational fallout.
            </p>

            <p>
              This article provides a practical roadmap for in-house counsel, company secretaries,
              and practitioners who need to translate the legislative changes into day-to-day
              governance steps. It highlights key timelines, transitional provisions, and priority
              action items for companies of varying sizes and profiles.
            </p>

            {/* Below content sections (as per design) */}
            <div className="pt-6 space-y-12">
              {[
                { title: 'The New Disclosure Paradigm' },
                { title: 'Expanding Board Responsibilities' },
                { title: 'The Penalty Framework' },
              ].map((section) => (
                <section key={section.title} className="space-y-5">
                  <h2 className="text-[22px] md:text-[26px] font-bold text-[#1A2853] leading-[135%]">
                    {section.title}
                  </h2>

                  <p className="text-[#1A2853]">
                    The Mauritian financial landscape has undergone a paradigm shift. With the
                    recent gazetting of the Companies(Amendment) Act 2024, practitioners and
                    directors alike find themselves navigating a more rigorous landscape of
                    accountability. These changes are not merely administrative; they represent a
                    fundamental realignment with the OECD and FATF requirements.
                  </p>

                  <div className="flex gap-6 pt-1">
                    <div className="w-1 bg-[#1A2853] rounded-full" />
                    <p className="text-[14px] md:text-[15px] leading-[190%] text-[#6B7280] max-w-[560px]">
                      As Mauritius continues to refine its legislative framework to meet
                      international transparency standards, the 2024 amendments to the Companies
                      Act mark a significant pivot in corporate governance
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </article>

          {/* Right sidebar: author + trending */}
          <aside className="space-y-10 text-[13px] pl-10">
            {/* About the author */}
            <div>
              <h2 className="text-[12px] font-bold tracking-[0.18em] text-[#6B7280] uppercase mb-4">
                About the Author
              </h2>
              <p className="text-[13px] leading-[185%] text-[#111827]">
                Adv. Behram Khan is specialist in Mauritian corporate law with over 20 years of
                experience advising international banks and offshore management companies.
              </p>
            </div>

            {/* Trending in Corporate */}
            <div>
              <h2 className="text-[12px] font-bold tracking-[0.18em] text-[#6B7280] uppercase mb-4">
                Trending in Corporate
              </h2>
              <div className="space-y-4 text-[13px]">
                {[
                  {
                    label: 'CASE LAW',
                    title:
                      'Supreme Court Ruling on Shareholder Oppression (Civil Case 104/23)',
                  },
                  {
                    label: 'REGULATION',
                    title:
                      'Supreme Court Ruling on Shareholder Oppression (Civil Case 104/23)',
                  },
                  {
                    label: 'ANALYSIS',
                    title:
                      'Supreme Court Ruling on Shareholder Oppression (Civil Case 104/23)',
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-[11px] font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-1">
                      {item.label}
                    </div>
                    <div className="text-[#1A2853] font-semibold leading-[150%]">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* Related Analysis Section */}
        <section className="mt-28 mb-16 pt-16 border-t border-gray-200">
          <div className="mb-14">
            <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#1A2853] tracking-tight">
              RELATED ANALYSIS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {[
              {
                image: '/publication-placeholder.png',
                category: 'PROPERTY LAW',
                title: 'Foreign Ownership of Real Estate: 2024 Policy Updates',
                href: '/blog/foreign-ownership-real-estate-2024',
              },
              {
                image: '/publication-placeholder.png',
                category: 'EMPLOYEMENT LAW',
                title: 'Remote Work Regulations: A Global Perspective for Mauritian Firms',
                href: '/blog/remote-work-regulations-mauritian-firms',
              },
              {
                image: '/publication-placeholder.png',
                category: 'LITIGATION',
                title: 'The Future of Arbitration in International Commercial Centers',
                href: '/blog/arbitration-international-commercial-centers',
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group block"
              >
                <div className="relative w-full aspect-[1.6/1] mb-6 overflow-hidden rounded-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-[12px] font-bold tracking-[0.12em] text-[#6B7280] uppercase">
                    {item.category}
                  </div>
                  <h3 className="text-[17px] md:text-[18px] font-bold text-[#1A2853] leading-[1.3] group-hover:text-[#2563EB] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-2">
          <p className="text-[12px] text-gray-400 font-medium text-left opacity-70">
            © 2025 LEGAL.MU Lawfirm. All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

