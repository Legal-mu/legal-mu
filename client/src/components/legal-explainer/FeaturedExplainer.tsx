import Image from 'next/image';
import { PlayIcon, ShareIcon } from '@heroicons/react/24/solid';

export default function FeaturedExplainer() {
    return (
        <section className="max-w-[1440px] mx-auto mt-24 px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                {/* Video Thumbnail */}
                <div className="flex-1 w-full relative">
                    <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl group cursor-pointer border-4 border-white">
                        <Image
                            src="/info_hub.jpg"
                            alt="Featured explainer"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                <PlayIcon className="w-10 h-10 text-[#1A2853] ml-1" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-[540px]">
                    <span className="inline-block text-[13px] font-bold tracking-[0.05em] text-[#64748B] mb-6 uppercase">
                        Featured Explainer
                    </span>
                    <h2 className="text-[40px] md:text-[48px] leading-[120%] font-bold text-[#1A2853] mb-8">
                        Advanced Property Law: Navigating Commercial Easements
                    </h2>
                    <p className="text-[18px] leading-[160%] text-[#64748B] mb-12 font-medium">
                        An in-depth analysis of recent legislative shifts affecting commercial property
                        boundaries and usage rights. Expertly curated for senior legal practitioners
                        and consultants.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-[#1A2853] text-white px-10 py-4 rounded-xl text-[16px] font-bold hover:bg-[#1A2853]/90 transition-all shadow-md">
                            Contact Specialist
                        </button>
                        <button className="flex items-center gap-3 px-8 py-4 rounded-xl text-[16px] font-bold text-[#1A2853] border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] transition-all">
                            <ShareIcon className="w-5 h-5 text-[#64748B]" />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
