'use client';

import { useState } from 'react';
import { ProfileLayout, ProfileInput } from '@/components/profile';

export default function SocialsEndorsementsPage() {
    const [formData, setFormData] = useState({
        linkedinProfile: '',
        facebookPage: '',
        xHandle: '',
        youtubeChannel: '',
    });

    const [endorsements, setEndorsements] = useState([
        { id: 1, name: 'Chambers & Partners', selected: true },
        { id: 2, name: 'Chambers & Partners', selected: true },
        { id: 3, name: 'Chambers & Partners', selected: true },
        { id: 4, name: 'Chambers & Partners', selected: true },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEndorsementToggle = (id: number) => {
        setEndorsements(endorsements.map(e =>
            e.id === id ? { ...e, selected: !e.selected } : e
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, endorsements });
    };

    return (
        <ProfileLayout
            activeSection="socials"
            breadcrumb="Socilas & Endorsements"
            title="Socials & Endorsements"
            subtitle="Manage your social media presence and official recognitions."
            profileCompletion={100}
        >
            {/* Form Card */}
            <div className="bg-white rounded-2xl px-12 py-10 w-full">
                <form onSubmit={handleSubmit}>
                    {/* Social Media & Networks Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.5">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                            </div>
                            <h2 className="text-[#0F172A] text-xl font-semibold">Social Media & Networks</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <ProfileInput
                                label="LinkedIn Profile"
                                name="linkedinProfile"
                                value={formData.linkedinProfile}
                                onChange={handleChange}
                                placeholder="eg. Port Louis"
                            />
                            <ProfileInput
                                label="Facebook Page"
                                name="facebookPage"
                                value={formData.facebookPage}
                                onChange={handleChange}
                                placeholder="eg. +230 5000 0000"
                            />
                            <ProfileInput
                                label="X Handle"
                                name="xHandle"
                                value={formData.xHandle}
                                onChange={handleChange}
                                placeholder="eg. Port Louis"
                            />
                            <ProfileInput
                                label="Youtube Channel"
                                name="youtubeChannel"
                                value={formData.youtubeChannel}
                                onChange={handleChange}
                                placeholder="eg. +230 5000 0000"
                            />
                        </div>
                    </div>

                    {/* Official Endorsements Section */}
                    <div className="mb-8 border-2 border-dashed border-[#E2E8F0] rounded-xl p-6 bg-[#F5F5F5]">
                        <div className="flex items-center gap-3 mb-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <h2 className="text-[#0F172A] text-xl font-semibold">Official Endorsements</h2>
                        </div>
                        <p className="text-[#64748B] text-sm mb-4">
                            Select the bodies that have officially recognized your practice.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {endorsements.map((endorsement) => (
                                <label
                                    key={endorsement.id}
                                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] transition-colors"
                                >
                                    <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${endorsement.selected
                                            ? 'bg-[#1E3A5F] border-[#1E3A5F]'
                                            : 'border-[#CBD5E1] bg-white'
                                            }`}
                                        onClick={() => handleEndorsementToggle(endorsement.id)}
                                    >
                                        {endorsement.selected && (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-sm text-[#0F172A]">{endorsement.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-8 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] font-medium text-sm hover:bg-[#F8FAFC] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#1E3A5F] rounded-xl text-white font-medium text-sm hover:bg-[#2D4A6F] transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
}
