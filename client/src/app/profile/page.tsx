'use client';

import { useState } from 'react';
import { ProfileLayout } from '@/components/profile';

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <ProfileLayout
            activeSection="account"
            breadcrumb="Account Info"
            title="Account Settings"
            subtitle="Manage your login credentials and core identity details. These information will be verified against bar council records."
            profileCompletion={20}
        >
            {/* Form Card */}
            <div
                className="bg-white rounded-[30px] px-12 py-10 w-full"
                style={{ opacity: 1, transform: 'rotate(0deg)' }}
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </div>
                    <h2 className="text-[#0F172A] text-xl font-semibold">Account Security</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Email Address */}
                    <div className="mb-6">
                        <label className="block text-[#0F172A] text-sm font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="zaryab@example.com"
                            className="w-full px-4 py-2.5 rounded-xl text-[14px] text-[#64748B]"
                            style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                        />
                    </div>

                    {/* Enter Old Password */}
                    <div className="mb-6">
                        <label className="block text-[#0F172A] text-sm font-semibold mb-2">Enter Old Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                placeholder="Enter Password...."
                                className="w-full px-4 py-2.5 rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#C0C0C0]"
                                style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                            />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="mb-6">
                        <label className="block text-[#0F172A] text-sm font-semibold mb-2">Change Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="xxxxxxxxx"
                                className="w-full px-4 py-2.5 rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#C0C0C0]"
                                style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                            />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-[#9CA3AF] text-xs mt-2">Must contain atleast 8 characters, one uppercase and one number</p>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-8">
                        <label className="block text-[#0F172A] text-sm font-semibold mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter Password...."
                                className="w-full px-4 py-2.5 rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#C0C0C0]"
                                style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                            />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            </button>
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
