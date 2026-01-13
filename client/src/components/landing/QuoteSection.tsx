'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function QuoteSection() {
    return (
        <section className="relative w-full py-16 overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 bg-[#f0f9ff]/80" />

            <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-16 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 group"
                >
                    <div className="relative rounded-none overflow-hidden shadow-xl transform group-hover:-translate-y-1 transition-all duration-500">
                        <Image
                            src="/courthouse_legal.png"
                            alt="Classical Courthouse"
                            width={600}
                            height={450}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative z-10 space-y-6"
                >
                    <p className="text-3xl md:text-5xl italic font-serif text-[#1A2542] leading-[1.3] tracking-tight">
                        “Law is the substitute for the personal revenge of the primitive world.”
                    </p>
                    <p className="text-gray-500 font-medium tracking-wide">
                        Oliver Wendell Holmes Jr.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
