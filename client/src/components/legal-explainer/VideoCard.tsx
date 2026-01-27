import Image from 'next/image';
import { PlayIcon, ShareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

interface VideoCardProps {
    title: string;
    views: string;
    date: string;
}

export default function VideoCard({ title, views, date }: VideoCardProps) {
    return (
        <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            {/* Thumbnail */}
            <div className="relative aspect-video cursor-pointer">
                <Image
                    src="/lawyer-placeholder.png"
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <PlayIcon className="w-5 h-5 text-[#1A2853] ml-0.5" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <h3 className="text-[20px] font-bold text-[#1A2853] leading-[140%] line-clamp-2">
                        {title}
                    </h3>
                    <button className="flex-shrink-0 p-2 text-[#64748B] hover:text-[#1A2853] transition-colors">
                        <ShareIcon className="w-5 h-5" />
                    </button>
                </div>

                <hr className="border-[#F1F5F9] mb-6" />

                <div className="flex items-center justify-between text-[13px] font-bold">
                    <button className="flex items-center gap-2 text-[#64748B] hover:text-[#1A2853] transition-colors uppercase tracking-wider">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Download
                    </button>
                    <div className="text-[#94A3B8]">
                        {views} views • {date}
                    </div>
                </div>
            </div>
        </div>
    );
}
