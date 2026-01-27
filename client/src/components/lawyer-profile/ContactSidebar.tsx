'use client';

import Image from 'next/image';
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactSidebar() {
    return (
        <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
                <h2 className="text-2xl font-bold text-[#1A2853]">Contact Information</h2>

                <button className="w-full py-4 bg-[#1A2853] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#2A3B73] transition-all shadow-md shadow-blue-900/10">
                    <EnvelopeIcon className="w-5 h-5" />
                    Contact Kim
                </button>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#F1F5F9] rounded-lg">
                            <PhoneIcon className="w-5 h-5 text-[#64748B]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Phone</p>
                            <p className="text-[#1A2853] font-semibold text-lg hover:text-blue-600 transition-colors cursor-pointer">+230 555 1234</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#F1F5F9] rounded-lg">
                            <GlobeAltIcon className="w-5 h-5 text-[#64748B]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Website</p>
                            <p className="text-[#1A2853] font-semibold text-lg hover:text-blue-600 transition-colors cursor-pointer">www.binladen-law.co</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#F1F5F9] rounded-lg">
                            <MapPinIcon className="w-5 h-5 text-[#64748B]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Address</p>
                            <p className="text-[#1A2853] font-semibold text-lg leading-tight">Port Louis, Mauritius</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#64748B]">Social Profiles</span>
                    <div className="flex gap-4">
                        <LinkIcon icon="linkedin" />
                        <LinkIcon icon="x" />
                    </div>
                </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
                <div className="relative h-64 bg-gray-100">
                    <Image
                        src="/map.png"
                        alt="Map Location"
                        fill
                        className="object-cover"
                    />
                    {/* The red indicator has been removed for a cleaner, more integrated look. */}
                    <div className="absolute inset-0 flex items-center justify-center">
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <button className="w-full py-3 bg-white text-[#1A2853] rounded-lg text-sm font-bold shadow-xl border border-gray-100 hover:bg-[#F8FAFC] transition-all">
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LinkIcon({ icon }: { icon: 'linkedin' | 'x' }) {
    return (
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B] hover:bg-[#1A2853] hover:text-white transition-all cursor-pointer">
            {icon === 'linkedin' ? (
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            ) : (
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            )}
        </div>
    );
}
