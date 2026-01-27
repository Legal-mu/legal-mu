'use client';

import { useState } from 'react';
import { ProfileLayout, ProfileInput, ProfileIcons } from '@/components/profile';

export default function PersonalInfoPage() {
    const [formData, setFormData] = useState({
        fullLegalName: 'Hanifa Ibrahim',
        professionalTitle: 'Barrister-at-Law',
        barRegistrationNumber: 'REG-882299',
        firmName: 'Bin Laden defense',
        isLegalEntity: true,
        legalEntityName: 'Bin Laden defense',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
        setFormData({
            ...formData,
            [target.name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const professionalTitleOptions = [
        { value: 'Barrister-at-Law', label: 'Barrister-at-Law' },
        { value: 'Solicitor', label: 'Solicitor' },
        { value: 'Advocate', label: 'Advocate' },
        { value: 'Attorney', label: 'Attorney' },
        { value: 'Legal Consultant', label: 'Legal Consultant' },
    ];

    return (
        <ProfileLayout
            activeSection="personal"
            breadcrumb="Personal & Professional Info"
            title="Personal & Professional Info"
            subtitle="manage your identity, professional title, and legal entity details."
            profileCompletion={40}
        >
            {/* Form Card */}
            <div className="bg-white rounded-2xl px-12 py-10 w-full">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.5">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <path d="M8 14h.01" />
                            <path d="M12 14h.01" />
                            <path d="M16 14h.01" />
                            <path d="M8 18h.01" />
                            <path d="M12 18h.01" />
                            <path d="M16 18h.01" />
                        </svg>
                    </div>
                    <h2 className="text-[#0F172A] text-xl font-semibold">Professional Identity</h2>
                </div>

                <p className="text-[#64748B] text-sm mb-6">
                    These details appear on your public profile and legal documents.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Full Legal Name & Professional Title */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <ProfileInput
                            label="Full Legal Name"
                            name="fullLegalName"
                            value={formData.fullLegalName}
                            onChange={handleChange}
                            placeholder="Hanifa Ibrahim"
                            icon={ProfileIcons.user}
                        />
                        <ProfileInput
                            label="Professional Title"
                            name="professionalTitle"
                            value={formData.professionalTitle}
                            onChange={handleChange}
                            type="select"
                            options={professionalTitleOptions}
                        />
                    </div>

                    {/* Note */}
                    <p className="text-[#9CA3AF] text-xs mb-6">
                        These details appear on your public profile and legal documents.
                    </p>

                    {/* Bar Registration Number & Firm/Chambers Name */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <ProfileInput
                            label="Bar Registration Number"
                            name="barRegistrationNumber"
                            value={formData.barRegistrationNumber}
                            onChange={handleChange}
                            placeholder="REG-882299"
                            icon={ProfileIcons.hash}
                        />
                        <ProfileInput
                            label="Firm/Chambers Name"
                            name="firmName"
                            value={formData.firmName}
                            onChange={handleChange}
                            placeholder="Bin Laden defense"
                            icon={ProfileIcons.briefcase}
                        />
                    </div>

                    {/* Legal Entity Checkbox */}
                    <div className="mb-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isLegalEntity"
                                checked={formData.isLegalEntity}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-[#E2E8F0] text-[#1E3A5F] focus:ring-[#1E3A5F] mt-0.5"
                            />
                            <div>
                                <span className="text-[#0F172A] text-sm font-medium">I operate as a registered legal entity</span>
                                <p className="text-[#9CA3AF] text-xs mt-1">
                                    Check this if you are billing or operating under a separate corporate identity (eg. LTD, LLP)
                                </p>
                            </div>
                        </label>
                    </div>

                    {/* Legal Entity Name - Only shown when checkbox is checked */}
                    {formData.isLegalEntity && (
                        <div className="mb-8">
                            <ProfileInput
                                label="Legal Entity Name"
                                name="legalEntityName"
                                value={formData.legalEntityName}
                                onChange={handleChange}
                                placeholder="Bin Laden defense"
                                icon={ProfileIcons.briefcase}
                                labelSize="xs"
                                labelUppercase={true}
                                borderColor="#1E3A5F"
                            />
                        </div>
                    )}

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
