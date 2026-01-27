'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterStep3() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        professionalAddress: '',
        city: '',
        postcode: '',
        country: '',
        primaryPhoneCode: '+230',
        primaryPhoneNumber: '',
        telephoneCode: '+230',
        telephoneNumber: '',
    });

    useEffect(() => {
        const step1Data = sessionStorage.getItem('registerStep1');
        const step2Data = sessionStorage.getItem('registerStep2');
        if (!step1Data || !step2Data) {
            router.push('/register');
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBack = () => {
        router.push('/register/step-2');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sessionStorage.setItem('registerStep3', JSON.stringify(formData));
        router.push('/register/step-4');
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-jost)' }}>
            {/* Header */}
            <nav className="bg-white px-4 md:px-8 py-5 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <img
                        src="/images/legalmu-logo.png"
                        alt="LEGAL.MU - Access to justice"
                        className="h-10 w-auto"
                    />
                </Link>

                <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#64748B]">Already have an account?</span>
                    <Link href="/login" className="text-[14px] font-semibold text-[#0F172A] hover:underline">
                        Login
                    </Link>
                </div>
            </nav>

            {/* Main Content - Light gray background below header */}
            <div className="min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'rgba(190, 204, 255, 0.14)' }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        {/* Left Section - Form */}
                        <div className="bg-white p-10 rounded-[20px] border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-[550px]">
                            {/* Progress Bar - 8 segments, only step 3 (current) is filled */}
                            <div className="flex gap-1 mb-8">
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#1E3A5F]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            </div>

                            <p className="text-[#64748B] text-[13px] italic mb-1">Step 3 of 8</p>
                            <h2 className="text-[22px] font-bold text-[#0F172A] mb-2">Contact Information</h2>
                            <p className="text-[#64748B] text-[14px] leading-[1.6] mb-8">
                                Please provide your office location and contact details for your public profile.
                            </p>

                            <form onSubmit={handleSubmit}>
                                {/* Professional Address */}
                                <div className="mb-4">
                                    <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                        Professional Address
                                    </label>
                                    <textarea
                                        name="professionalAddress"
                                        placeholder="Enter your full office address (Street, Building, Floor)"
                                        value={formData.professionalAddress}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-transparent rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9] resize-none"
                                    />
                                    <p className="text-[11px] text-[#94A3B8] mt-1">
                                        This address will be displayed on your public profile & map.
                                    </p>
                                </div>

                                {/* City & Postcode */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="eg Charsadda"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                            Postcode
                                        </label>
                                        <input
                                            type="text"
                                            name="postcode"
                                            placeholder="eg 12345"
                                            value={formData.postcode}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9]"
                                        />
                                    </div>
                                </div>

                                {/* Country */}
                                <div className="mb-4">
                                    <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="eg Pakistan"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9]"
                                    />
                                </div>

                                {/* Primary Phone Number */}
                                <div className="mb-4">
                                    <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                        Primary Phone Number
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-1 px-3 py-3 bg-[#F1F5F9] rounded-full text-[14px] text-[#64748B] min-w-[100px]">
                                            <span className="text-[16px]">🇲🇺</span>
                                            <select
                                                name="primaryPhoneCode"
                                                value={formData.primaryPhoneCode}
                                                onChange={handleChange}
                                                className="bg-transparent border-none outline-none text-[14px] text-[#64748B] cursor-pointer appearance-none pr-4"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 0 center'
                                                }}
                                            >
                                                <option value="+230">+230</option>
                                                <option value="+1">+1</option>
                                                <option value="+44">+44</option>
                                                <option value="+91">+91</option>
                                            </select>
                                        </div>
                                        <input
                                            type="tel"
                                            name="primaryPhoneNumber"
                                            placeholder="5814976"
                                            value={formData.primaryPhoneNumber}
                                            onChange={handleChange}
                                            className="flex-1 px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9]"
                                        />
                                    </div>
                                </div>

                                {/* Telephone Number */}
                                <div className="mb-8">
                                    <label className="block text-[14px] font-bold text-[#1E3A5F] mb-2">
                                        Telephone Number
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-1 px-3 py-3 bg-[#F1F5F9] rounded-full text-[14px] text-[#64748B] min-w-[100px]">
                                            <span className="text-[16px]">🇲🇺</span>
                                            <select
                                                name="telephoneCode"
                                                value={formData.telephoneCode}
                                                onChange={handleChange}
                                                className="bg-transparent border-none outline-none text-[14px] text-[#64748B] cursor-pointer appearance-none pr-4"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 0 center'
                                                }}
                                            >
                                                <option value="+230">+230</option>
                                                <option value="+1">+1</option>
                                                <option value="+44">+44</option>
                                                <option value="+91">+91</option>
                                            </select>
                                        </div>
                                        <input
                                            type="tel"
                                            name="telephoneNumber"
                                            placeholder="5814976"
                                            value={formData.telephoneNumber}
                                            onChange={handleChange}
                                            className="flex-1 px-4 py-3 border border-transparent rounded-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] focus:border-[#CBD5E1] transition-all bg-[#F1F5F9]"
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 border border-[#E2E8F0] rounded-full text-[#0F172A] text-[14px] font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-[#1E3A5F] text-white rounded-full font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#2D4A6F] transition-colors"
                                    >
                                        Continue
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Section - Did You Know Panel */}
                        <div className="flex flex-col gap-8">
                            {/* Light Blue Background Panel */}
                            <div className="rounded-2xl p-8 min-h-[600px] flex items-center justify-center">
                                <div className="text-left">
                                    <h3 className="text-[42px] font-bold text-[#1A2853] leading-[100%] mb-6">Did You Know?</h3>
                                    <p className="text-[28px] font-light text-black leading-[120%]">
                                        Lawyers with a complete<br />
                                        profile receives 3x more<br />
                                        clients.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-8">
                        <p className="text-[12px] text-[#94A3B8]">
                            Your details will be verified before your profile goes live.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
