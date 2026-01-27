'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Hero() {
    return (
        <section className="relative pt-6 pb-16">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#1A2853] text-xs font-bold tracking-wide border border-gray-100 shadow-sm mb-8 font-jost">
                        <svg className="w-4 h-4 text-[#1A2853]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span>Top Rated in Mauritius</span>
                    </div>
                    <h1
                        className="font-jost 
  text-[42px] md:text-[64px] lg:text-[76px]
  font-semibold
  leading-[0.95]
  tracking-[-0.02em]
  text-[#111827]
  mb-6"
                    >
                        DEFENDING <br />

                        <span className="block">
                            YOUR{" "}
                            <span className="text-[#1C2250] italic font-semibold">
                                RIGHTS
                            </span>
                        </span>

                        <span className="block">
                            WITH PRECISION
                        </span>
                    </h1>



                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full max-w-7xl mx-auto h-[350px] md:h-[500px] mt-10 rounded-[2rem] overflow-hidden shadow-2xl"
            >
                {/* Background Image */}
                <Image
                    src="/lady_justice_landscape.jpg"
                    alt="Lady Justice"
                    fill
                    className="object-cover"
                />

                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16">
                    <div className="max-w-xl text-left space-y-6">

                        {/* Access to Justice Badge */}
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20 shadow-sm font-jost">
                            Access to Justice
                        </span>

                        {/* Quote */}
                        <blockquote className="text-xl md:text-3xl lg:text-3xl font-jost text-white leading-snug tracking-wide font-medium drop-shadow-lg">
                            “Justice consists not in being neutral between right and wrong,
                            but in finding out the right and upholding it.”
                        </blockquote>

                        {/* Search Bar */}
                        <div className="pt-2">
                            <div className="bg-white rounded-full px-5 py-2 flex items-center gap-3 w-full max-w-sm shadow-xl ring-1 ring-white/50 hover:shadow-2xl transition-all">
                                <MagnifyingGlassIcon className="w-5 h-5 text-[#1e3a8a]" />
                                <input
                                    type="text"
                                    placeholder="Search area of law..."
                                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400 font-jost"
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </motion.div>
        </section>
    );
}
