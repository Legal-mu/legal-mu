'use client';

import Image from 'next/image';
import { StarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface SpecialistCardProps {
    name: string;
    role: string;
    rating: number;
    reviews: number;
    image: string;
    tags: string[];
}

export default function SpecialistCard({ name, role, rating, reviews, image, tags }: SpecialistCardProps) {
    return (
        <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-10 flex items-center gap-8 hover:border-[#1A2853]/20 transition-all shadow-sm group min-h-[220px]">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                    <h4 className="text-[24px] font-bold text-[#1A2853] truncate">{name}</h4>
                    <CheckCircleIcon className="w-6 h-6 text-[#1A2853]" />
                </div>
                <p className="text-[16px] text-[#64748B] font-medium mb-3">{role}</p>

                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="text-[16px] font-bold text-[#1A2853]">{rating}</span>
                    </div>
                    <span className="text-[16px] text-[#94A3B8]">({reviews} Reviews)</span>
                </div>

                <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-[13px] font-bold text-[#64748B]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
