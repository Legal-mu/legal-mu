'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lawyers } from '@/data/landing';

export default function LawyerShowcase() {
    return (
        <section className="relative py-12 px-6 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image src="/courthouse_legal.png" alt="Background" fill className="object-cover opacity-5" />
                <div className="absolute inset-0 bg-white/95" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xl font-extrabold text-gray-900 uppercase tracking-[0.2em] mb-2">OUR ELITE TEAM</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight">
                            Our Top Rated <span className="text-[#2563eb]">Lawyers</span>
                        </h2>
                    </motion.div>
                    <Link href="/community" className="px-10 py-5 rounded-full border-2 border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-all flex items-center gap-3 group">
                        Find Your Lawyer <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {lawyers.map((lawyer, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 bg-gray-100">
                                <Image src={lawyer.img} alt={lawyer.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{lawyer.name}</h3>
                            <p className="text-[#2563eb] text-sm font-bold uppercase tracking-widest mt-1 opacity-80">{lawyer.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
