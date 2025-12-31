'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { blogPosts } from '@/data/landing';

export default function BlogSection() {
    return (
        <section className="py-16 px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">OUR BLOG</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight">
                        Latest Legal <span className="text-[#1C2250]">Insights</span>
                    </h2>
                </motion.div>
                <Link href="/resources" className="text-[#2563eb] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    View All Insights <ArrowRightIcon className="w-5 h-5" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {blogPosts.map((post, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
                            <Image src={post.img} alt={post.title} fill className="object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                                {post.category}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4">{post.title}</h3>
                        <span className="text-xs text-gray-400 font-medium">{post.date} · {post.duration}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
