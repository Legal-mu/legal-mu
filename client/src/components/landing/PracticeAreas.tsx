'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { practiceAreas } from '@/data/landing';

export default function PracticeAreas() {
    return (
        <div className="py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">OUR PRACTICE AREAS</p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-6 leading-tight">
                    Comprehensive <span className="text-[#2563eb]">Legal Solutions</span>
                </h2>
                <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">
                    We specialize in a wide range of legal fields to support your personal and business needs with dedication and expertise
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {practiceAreas.map((area, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-[#F8FAFC] border border-gray-200 rounded-[2.5rem] p-10 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all group cursor-pointer shadow-sm"
                    >
                        <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#2563eb] mb-8 group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-300">
                            <area.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{area.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">{area.description}</p>
                        <Link href={area.link} className="text-[#2563eb] font-bold text-xs flex items-center gap-2 group/link">
                            Learn more <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-[#e2e8f0]/40 border border-gray-100 rounded-[2.5rem] p-10 group cursor-pointer h-full flex flex-col items-center justify-center text-center hover:bg-[#e2e8f0]/60 transition-all"
                >
                    <Link href="/services" className="flex flex-col items-center gap-6">
                        <div className="w-16 h-16 rounded-full border-2 border-blue-200 flex items-center justify-center text-[#1e3a8a] group-hover:bg-[#1e3a8a] group-hover:text-white group-hover:border-[#1e3a8a] transition-all duration-300">
                            <ArrowRightIcon className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-bold text-[#1e3a8a] tracking-tight">View All Services</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
