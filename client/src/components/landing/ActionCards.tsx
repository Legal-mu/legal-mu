'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ActionCards() {
    return (
        <div className="grid md:grid-cols-2 gap-8 my-16">
            {/* Hire a Lawyer Card */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#1A2853] rounded-[2rem] p-6 flex items-center justify-between group cursor-pointer hover:bg-[#2a3047] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                        {/* Gavel Icon */}
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6h6m-3-3v6M9.018 7.973L3 14V8h-.001M4 14.004l5.987-6.023 5.923 5.923-5.987 5.981-5.968-5.753a.936.936 0 01.045-1.128z" />
                            {/* Trying a better gavel-like path or generic legal hammer */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 20h10M12 20v-8m0 0l-3-3m3 3l3-3m-6 0a3 3 0 116 0A3 3 0 116 11z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-1 font-jost">Hire a Lawyer</h3>
                        <p className="text-gray-400 text-sm font-medium max-w-[200px] leading-snug font-jost">Get expert legal defence for your case today</p>
                    </div>
                </div>
                <div className="w-12 h-12 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1C2237] transition-all">
                    <MagnifyingGlassIcon className="w-6 h-6" />
                </div>
            </motion.div>

            {/* Join as Lawyer Card */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#F3F4F6] border border-gray-200 rounded-[2rem] p-6 flex items-center justify-between group cursor-pointer hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all hover:-translate-y-1"
            >
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#E5E7EB] flex items-center justify-center text-gray-800">
                        {/* Briefcase Icon */}
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-[#111827] text-2xl font-bold mb-1 font-jost">Join as a Lawyer</h3>
                        <p className="text-gray-500 text-sm font-medium max-w-[200px] leading-snug font-jost">Get expert legal defence for your case today</p>
                    </div>
                </div>
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#E5E7EB] flex items-center justify-center text-gray-600 group-hover:bg-[#1C2237] group-hover:text-white transition-all">
                    <span className="text-2xl font-light">+</span>
                </div>
            </motion.div>
        </div>
    );
}
