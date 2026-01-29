'use client';

import { useState } from 'react';
import { ProfileLayout, ProfileInput, ProfileIcons } from '@/components/profile';

export default function ContactInfoPage() {
    const [formData, setFormData] = useState({
        professionalAddress: '123 Legal Avenue, Suite 400',
        city: 'Port Louis',
        postCode: '+230 5000 0000',
        country: 'Mauritius',
        primaryPhoneCode: '+230',
        primaryPhone: '5814976',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const countryOptions = [
        { value: 'Mauritius', label: 'Mauritius' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'United States', label: 'United States' },
        { value: 'France', label: 'France' },
        { value: 'India', label: 'India' },
    ];

    const phoneCodeOptions = [
        { value: '+230', label: '+230' },
        { value: '+1', label: '+1' },
        { value: '+44', label: '+44' },
        { value: '+33', label: '+33' },
        { value: '+91', label: '+91' },
    ];

    return (
        <ProfileLayout
            activeSection="contact"
            breadcrumb="Contact Information"
            title="Contact Information"
            subtitle="Manage your professional contact information and office location to help clients find you"
            profileCompletion={50}
        >
            {/* Form Card */}
            <div className="bg-white rounded-2xl px-12 py-10 w-full">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <h2 className="text-[#0F172A] text-xl font-semibold">Contact Details</h2>
                </div>

                <p className="text-[#64748B] text-sm mb-6">
                    These details appear on your public profile.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Professional Address */}
                    <div className="mb-6">
                        <ProfileInput
                            label="Professional Address"
                            name="professionalAddress"
                            value={formData.professionalAddress}
                            onChange={handleChange}
                            placeholder="eg. 123 Legal Avenue, Suite 400"
                        />
                    </div>

                    {/* City & Post Code */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <ProfileInput
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="eg. Port Louis"
                        />
                        <ProfileInput
                            label="Post Code"
                            name="postCode"
                            value={formData.postCode}
                            onChange={handleChange}
                            placeholder="eg. +230 5000 0000"
                        />
                    </div>

                    {/* Country */}
                    <div className="mb-6">
                        <ProfileInput
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            type="select"
                            options={countryOptions}
                        />
                    </div>

                    {/* Phone Numbers */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        {/* Primary Phone Number */}
                        <div>
                            <label className="block text-[#0F172A] text-sm font-semibold mb-2">Primary Phone Number</label>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <div className="flex items-center gap-1 px-2 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F5F5F5]">
                                        <span className="text-lg">🇲🇺</span>
                                        <select
                                            name="primaryPhoneCode"
                                            value={formData.primaryPhoneCode}
                                            onChange={handleChange}
                                            className="bg-transparent text-sm text-[#64748B] appearance-none pr-4 outline-none"
                                        >
                                            {phoneCodeOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    name="primaryPhone"
                                    value={formData.primaryPhone}
                                    onChange={handleChange}
                                    placeholder="5814976"
                                    className="w-[180px] px-4 py-2.5 rounded-xl text-[14px] text-[#64748B] border border-[#E2E8F0]"
                                    style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                                />
                            </div>
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
