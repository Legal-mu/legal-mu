'use client';

import Image from 'next/image';
import { PlayCircleIcon, PlayIcon } from '@heroicons/react/24/solid';

interface PracticeDetailHeroProps {
    title: string;
    description: string;
    imageSrc?: string;
}

export default function PracticeDetailHero({ title, description, imageSrc = '/video-placeholder.png' }: PracticeDetailHeroProps) {
    return (
        <div className="p-10 pb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="max-w-xl">
                <div className="inline-block px-4 py-1.5 bg-[#E2E8F0] rounded-full text-[#1A2853] text-xs font-bold mb-6">
                    ← Back To Practice Area
                </div>
                <h1 className="text-[48px] font-bold text-[#111827] leading-tight mb-4">
                    {title}
                </h1>
                <p className="text-gray-600 text-[17px] leading-relaxed mb-8">
                    {description}
                </p>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#1A2853] text-white rounded-lg text-sm font-semibold hover:bg-[#2A3B73] transition-all shadow-md">
                    Watch Overview
                    <PlayCircleIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="relative w-full max-w-[500px] aspect-video rounded-[32px] overflow-hidden group cursor-pointer bg-gray-100 shadow-md">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center pl-2 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                        <PlayIcon className="w-10 h-10 text-[#1A2853]" />
                    </div>
                </div>
                <Image
                    src="/info_hub.jpg"
                    alt="Video Thumbnail"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}
