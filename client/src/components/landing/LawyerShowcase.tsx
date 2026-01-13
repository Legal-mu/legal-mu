'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lawyers } from '@/data/landing';

export default function LawyerShowcase() {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image src="/courthouse_legal.png" alt="Background" fill className="object-cover opacity-20" />
                <div className="absolute inset-0 bg-gray-900/10" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto rounded-[1rem] bg-[#F8F9FB]/95 backdrop-blur-sm p-12 md:p-20 shadow-2xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A2542] mb-6 tracking-tight uppercase">
                            Our Top Rated Lawyers
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                            Trusted by clients for dedication, transparency, and successful outcomes. Every case is handled with care, precision, and a deep commitment to protecting your rights.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {lawyers.map((lawyer, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="bg-white rounded-[1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <Image
                                        src={lawyer.img}
                                        alt={lawyer.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 bg-white">
                                    <h3 className="text-xl font-bold text-[#1A2542]">{lawyer.name}</h3>
                                    <p className="text-gray-500 text-sm font-medium mt-1">{lawyer.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
