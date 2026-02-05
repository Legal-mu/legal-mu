'use client';

import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

interface RecommendationsSectionProps {
    lawyer: any;
}

export default function RecommendationsSection({ lawyer }: RecommendationsSectionProps) {
    const lawyers = [
        { id: 1, name: 'Faysal', specialty: 'Criminal Law', rating: '4.8', reviews: '94', image: '/lawyer-placeholder.png' },
        { id: 2, name: 'Faysal', specialty: 'Criminal Law', rating: '4.8', reviews: '94', image: '/lawyer-placeholder.png' },
        { id: 3, name: 'Faysal', specialty: 'Criminal Law', rating: '4.8', reviews: '94', image: '/lawyer-placeholder.png' },
    ];

    return (
        <div className="py-10 space-y-8">
            <h2 className="text-xl font-bold text-[#1A2853]">You may also be interested in</h2>

            <div className="flex flex-wrap gap-8">
                {lawyers.map((lawyer) => (
                    <div
                        key={lawyer.id}
                        style={{ width: '280px', height: '200px' }}
                        className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-50 flex-shrink-0">
                                <Image
                                    src={lawyer.image}
                                    alt={lawyer.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-[#1A2853] text-[16px] truncate">{lawyer.name}</h3>
                                <p className="text-[13px] text-[#64748B] font-medium truncate">{lawyer.specialty}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-[15px]">
                            <StarIcon className="w-4 h-4 text-[#1A2853]" />
                            <span className="font-bold text-[#1A2853]">{lawyer.rating}</span>
                            <span className="text-[#64748B]">({lawyer.reviews})</span>
                        </div>

                        <button className="w-full py-2 border border-[#64748B]/30 text-[#1A2853] rounded-full text-[14px] font-bold hover:bg-[#1A2853] hover:text-white transition-all">
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
