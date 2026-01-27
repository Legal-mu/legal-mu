'use client';

import { useState } from 'react';
import { ArrowRightIcon, UserIcon, HomeIcon, BookOpenIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function FrameworkSection() {
    const [activeBook, setActiveBook] = useState(2); // Mock active state

    return (
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-70">
            {/* Sidebar */}
            <div>
                <h2 className="text-2xl font-bold text-[#1A2853] mb-4">Legal Framework</h2>
                <p className="text-[17px] text-gray-500 mb-8 leading-relaxed">The civil code of Mauritius is the foundation of private legal relations.</p>

                <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#E2E8F0] rounded-lg mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A2853]"></div>
                    <span className="text-[13px] font-bold text-[#1A2853] tracking-wide uppercase">QUICK REFERENCE</span>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-sm">
                    <div className="space-y-4">
                        {[
                            { title: 'Book 1: Of Persons', icon: UserIcon },
                            { title: 'Book 2: Of Property', icon: HomeIcon },
                            { title: 'Book 3: Of Ownership', icon: BookOpenIcon },
                            { title: 'Book 4: Of Obligation', icon: ScaleIcon }
                        ].map((book, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveBook(idx)}
                                className={`w-full flex items-center gap-6 px-2 py-3 rounded-xl text-sm font-medium transition-all ${idx === activeBook
                                    ? 'bg-[#E2E8F0] text-[#1A2853]'
                                    : 'bg-transparent text-[#1A2853] hover:bg-gray-50'
                                    }`}
                            >
                                <book.icon className={`w-5 h-5 ${idx === activeBook ? 'stroke-2' : 'stroke-1.5'}`} />
                                {book.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Content - Articles */}
            <div>
                <h2 className="text-[32px] font-bold text-[#1A2853] mb-6">Key Sections and Clauses</h2>
                <div className="space-y-4">
                    {[
                        { id: 'Article 1382', title: 'Tortious Liability (Tort)', desc: '"Any act by which a person causes damage to another obliges the person through whose fault it happened to repair it"', sub: 'The fundamental basis for person injury and negligence claims in the Mauritian legal system.' },
                        { id: 'Article 1101', title: 'Nature of Contracts', desc: '"A contract is an agreement by which one or more persons bind themselves toward one or more others to give, to do, or not to do something"', sub: 'Defines the legal insight and essential elements of binding agreements between parties.' },
                        { id: 'Article 212', title: 'Marital Obligations', desc: '"Spouses mutually owe each other fidelity, help and assistance"', sub: 'The foundational pillar of family law and divorce proceedings within the republic of Mauritius.' },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-[32px] border border-[#1A2853] border-l-[16px] px-10 py-10 flex flex-col md:flex-row gap-8 hover:shadow-md transition-shadow group">
                            <div className="md:w-[28%]">
                                <span className="inline-block px-3 py-1 bg-[#E2E8F0] text-[#1A2853] text-[14px] font-bold rounded mb-3">
                                    {item.id}
                                </span>
                                <h3 className="text-[18px] font-bold text-[#111827]">{item.title}</h3>
                            </div>
                            <div className="flex-1 pl-2">
                                <p className="text-[18px] text-gray-500 italic mb-3 leading-relaxed">
                                    {item.desc}
                                </p>
                                <p className="text-[14px] text-gray-400">
                                    {item.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
