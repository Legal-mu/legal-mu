'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { testimonials } from '@/data/landing';

export default function Testimonials() {
    return (
        <div className="relative py-16 -mx-6 my-12 overflow-hidden">
            <div className="absolute inset-0 text-center">
                <Image src="/courthouse_legal.png" alt="Background" fill className="object-cover opacity-20 grayscale" />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                {testimonials.map((testi, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-2xl p-12"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden relative">
                                <Image src={testi.avatar} alt={testi.author} fill className="object-cover" />
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-8 font-jost">
                            &quot;{testi.quote}&quot;
                        </p>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg font-jost">{testi.author}</h4>
                            <p className="text-[#1A2853] font-medium font-jost">{testi.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
