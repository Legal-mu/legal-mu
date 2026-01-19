'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-12 md:p-20 overflow-hidden relative"
                >
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                        {/* Left Content */}
                        <div className="space-y-10 pt-4">
                            <div className="space-y-6">
                                <h2 className="text-5xl md:text-6xl font-extrabold text-[#1A2853] leading-[1.1] tracking-tight">
                                    Need Legal <br />
                                    <span className="text-[#1A2853]">Advice?</span>
                                </h2>
                                <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                                    Don&apos;t navigate the complexity of law alone. Schedule a free, no-obligation consultation with our expert team today. We are here to listen and help.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] flex items-center justify-center text-[#2563eb] group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#1A2853">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">CALL US 24/7</p>
                                        <p className="text-xl font-bold text-[#1A2853]">+1 (800) 555-0199</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] flex items-center justify-center text-[#2563eb] group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#1A2853">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">EMAIL US</p>
                                        <p className="text-xl font-bold text-[#1A2853]">consult@legal.mu</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Card */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#1A2853]">Full Name</label>
                                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:border-[#1A2853] focus:bg-white focus:ring-4 focus:ring-[#1A2853]/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400" placeholder="Zaryab Khan" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#1A2853]">Email Address</label>
                                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:border-[#1A2853] focus:bg-white focus:ring-4 focus:ring-[#1A2853]/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400" placeholder="zaryab@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#1A2853]">Practice Area</label>
                                    <div className="relative">
                                        <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:border-[#1A2853] focus:bg-white focus:ring-4 focus:ring-[#1A2853]/10 outline-none transition-all font-medium text-gray-900 appearance-none cursor-pointer">
                                            <option>General Inquiry</option>
                                            <option>Corporate Law</option>
                                            <option>Family Law</option>
                                            <option>Criminal Defense</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#1A2853">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-4 rounded-xl bg-[#1A2853] hover:bg-[#111827] text-white font-bold text-lg transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] mt-4">
                                    Request Free Callback
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
