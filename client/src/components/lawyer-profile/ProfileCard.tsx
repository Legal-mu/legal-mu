'use client';

import Image from 'next/image';
import { ShareIcon, MapPinIcon, StarIcon, BriefcaseIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface ProfileCardProps {
    lawyer: any;
}

export default function ProfileCard({ lawyer }: ProfileCardProps) {
    const profile = lawyer?.lawyerProfile;

    const getImageUrl = (url: string | null | undefined) => {
        if (!url) return '/images/placeholder-avatar.jpg';
        if (url.startsWith('http')) return url;
        return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}${url}`;
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative group overflow-hidden">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image */}
                <div className="relative">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                        <Image
                            src={getImageUrl(profile?.headshotUrl || lawyer?.avatar)}
                            alt={`${lawyer?.firstName} ${lawyer?.lastName}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white rounded-full p-0.5 shadow-md">
                        <CheckCircleIcon className="w-6 h-6 text-[#1A2853]" />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="px-4 py-1.5 bg-[#F1F5F9] text-[#64748B] text-xs font-semibold rounded-full uppercase tracking-wider">
                            {profile?.title || 'Attorney'}
                        </span>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ShareIcon className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold text-[#1A2853]">
                            {profile?.fullLegalName || `${lawyer?.firstName} ${lawyer?.lastName}`}
                        </h1>
                        <p className="text-xl text-[#64748B]">
                            {profile?.firmName || 'Independent Practice'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748B]">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4 text-[#1A2853]/60" />
                            <span>{profile?.city || 'Mauritius'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <StarIconSolid className="w-4 h-4 text-yellow-400" />
                            <span className="font-bold text-[#1A2853]">5.0</span>
                            <span className="text-gray-400">(0 Reviews)</span>
                        </div>
                        {profile?.experienceYears && (
                            <div className="flex items-center gap-2">
                                <BriefcaseIcon className="w-4 h-4 text-[#1A2853]/60" />
                                <span>{profile.experienceYears}+ Years Exp</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {profile?.practiceAreas?.slice(0, 5).map((area: string, idx: number) => (
                            <span
                                key={idx}
                                className="px-4 py-1.5 bg-[#F8FAFC] border border-gray-100 text-[#64748B] text-xs font-medium rounded-full hover:border-[#1A2853]/20 transition-colors"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
