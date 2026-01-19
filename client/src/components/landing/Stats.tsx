'use client';

import { motion } from 'framer-motion';
import { stats } from '@/data/landing';

export default function Stats() {
    return (
        <div className="bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] py-10 -mx-6 px-6 rounded-xl my-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="text-center"
                    >
                        <h3 className="text-4xl md:text-5xl font-bold text-[#1A2853] mb-2 font-jost">{stat.value}</h3>
                        <p className="text-sm text-gray-600 uppercase tracking-wide font-jost">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
