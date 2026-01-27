'use client';

import { StarIcon, ChatBubbleLeftRightIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function ReviewSection() {
    const ratings = [
        { stars: 5, percentage: 85, color: 'bg-green-500' },
        { stars: 4, percentage: 10, color: 'bg-blue-900' },
        { stars: 3, percentage: 3, color: 'bg-yellow-400' },
        { stars: 2, percentage: 1, color: 'bg-red-500' },
        { stars: 1, percentage: 1, color: 'bg-indigo-600' },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F1F5F9] rounded-lg">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#1A2853]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1A2853]">Client Reviews</h2>
                </div>
                <button className="px-6 py-2 border border-[#1A2853] text-[#1A2853] rounded-lg text-sm font-bold hover:bg-[#F8FAFC] transition-colors">
                    Write a Review
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 items-center">
                <div className="text-center space-y-2">
                    <div className="text-6xl font-bold text-[#1A2853]">4.9</div>
                    <div className="flex justify-center text-yellow-400">
                        <StarIcon className="w-6 h-6" />
                        <StarIcon className="w-6 h-6" />
                        <StarIcon className="w-6 h-6" />
                        <StarIcon className="w-6 h-6" />
                        <StarIconOutline className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-[#64748B] font-medium tracking-tight">Based on 120 reviews</p>
                </div>

                <div className="space-y-3">
                    {ratings.map((rate) => (
                        <div key={rate.stars} className="flex items-center gap-4">
                            <span className="text-xs font-bold text-[#64748B] w-4">{rate.stars}</span>
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${rate.color} rounded-full transition-all duration-1000`}
                                    style={{ width: `${rate.percentage}%` }}
                                ></div>
                            </div>
                            <span className="text-xs font-medium text-[#64748B] w-8 text-right">{rate.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Individual Review */}
            <div className="pt-8 border-t border-gray-50 space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#1A2853] font-bold text-lg shadow-sm">
                        US
                    </div>
                    <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <h4 className="font-bold text-[#1A2853]">Umair Syed</h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                                    <CheckBadgeIcon className="w-3.5 h-3.5 text-blue-500" />
                                    Verified Client
                                </div>
                            </div>
                            <div className="flex text-yellow-400">
                                <StarIcon className="w-4 h-4" />
                                <StarIcon className="w-4 h-4" />
                                <StarIcon className="w-4 h-4" />
                                <StarIconOutline className="w-4 h-4" />
                                <StarIconOutline className="w-4 h-4" />
                            </div>
                        </div>

                        <p className="text-sm text-[#64748B] leading-relaxed italic">
                            &quot;Kim was exceptional in handling our case. His attention to detail and ability to navigate complex regulations saved us a lot of time and resources. Highly recommended.&quot;
                        </p>

                        {/* Response */}
                        <div className="bg-[#F8FAFC] border-l-4 border-[#1A2853] p-4 rounded-r-xl space-y-1">
                            <p className="text-xs font-bold text-[#1A2853]">Response from Kim Jong Un</p>
                            <p className="text-xs text-[#64748B] leading-relaxed">
                                Thankyou, Umair Syed. It was a pleasure working with you.
                            </p>
                        </div>
                    </div>
                </div>

                <button className="w-full py-4 text-sm font-bold text-[#64748B] flex items-center justify-center gap-2 hover:text-[#1A2853] transition-colors">
                    Show more reviews
                    <ChevronDownIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
