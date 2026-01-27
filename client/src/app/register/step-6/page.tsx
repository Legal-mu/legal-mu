'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterStep6() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [isPublic, setIsPublic] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const step1Data = sessionStorage.getItem('registerStep1');
        const step2Data = sessionStorage.getItem('registerStep2');
        const step3Data = sessionStorage.getItem('registerStep3');
        const step4Data = sessionStorage.getItem('registerStep4');
        const step5Data = sessionStorage.getItem('registerStep5');
        if (!step1Data || !step2Data || !step3Data || !step4Data || !step5Data) {
            router.push('/register');
        }
    }, [router]);

    const handleBack = () => {
        router.push('/register/step-5');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSave = {
            photoPreview,
            isPublic,
        };
        sessionStorage.setItem('registerStep6', JSON.stringify(dataToSave));
        router.push('/register/step-7');
    };

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleRemove = () => {
        setPhotoPreview(null);
        setPhotoFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current?.click();
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

            {/* Main Content */}
            <div className="min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'rgba(190, 204, 255, 0.14)' }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
                    {/* Progress Bar - 8 segments, step 6 (current) is filled */}
                    <div className="flex gap-1 mb-8 items-center justify-center">
                        <div className="w-[40px] h-[6px] rounded-full bg-[#E2E8F0]" />
                        <div className="w-[40px] h-[6px] rounded-full bg-[#E2E8F0]" />
                        <div className="w-[40px] h-[6px] rounded-full bg-[#E2E8F0]" />
                        <div className="w-[40px] h-[6px] rounded-full bg-[#E2E8F0]" />
                        <div className="w-[40px] h-[6px] rounded-full bg-[#E2E8F0]" />
                        <div className="w-[40px] h-[6px] rounded-full bg-[#1A2853]" />
                        <div className="w-[40px] h-[6px] rounded-full bg-[#E2E8F0]" />
                        <div className="w-[40px] h-[6px] rounded-full bg-[#E2E8F0]" />
                    </div>

                    <div className="grid lg:grid-cols-[1fr_400px] overflow-hidden rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] bg-white border border-[#E2E8F0]">
                        {/* Left Section - Form */}
                        <div className="p-12">
                            <p className="text-[#64748B] text-[14px] font-medium mb-1">Step 6 of 8</p>
                            <h2 className="text-[28px] font-bold text-[#0F172A] mb-2 leading-tight">Visual Profile</h2>
                            <p className="text-[15px] text-[#64748B] mb-10 leading-relaxed">
                                Upload a professional headshot. This is the first thing clients will see.
                            </p>

                            <form onSubmit={handleSubmit}>
                                {/* Photo Upload Section */}
                                <div className="flex items-start gap-8 mb-8">
                                    {/* Preview Circle */}
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-[165px] h-[165px] rounded-full bg-[#F1F5F9] flex items-center justify-center overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
                                            {photoPreview ? (
                                                <img
                                                    src={photoPreview}
                                                    alt="Profile preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <svg width="70" height="70" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="9" r="4" fill="#CBD5E1" />
                                                    <path
                                                        d="M12 14C8.13 14 5 16.13 5 19V20H19V19C19 16.13 15.87 14 12 14Z"
                                                        fill="#CBD5E1"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-[13px] text-[#64748B] italic font-medium">Preview</span>
                                    </div>

                                    {/* Upload Zone */}
                                    <div className="flex-1">
                                        <div
                                            onClick={handleClickUpload}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={`border-2 border-dashed rounded-2xl py-8 px-8 text-center cursor-pointer transition-all duration-300 ${isDragging
                                                ? 'border-[#1A2853] bg-[#F1F5F9] scale-[1.01]'
                                                : 'border-[#CBD5E1] hover:border-[#94A3B8] bg-[#F8FAFC]'
                                                }`}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/svg+xml,image/png,image/jpeg"
                                                onChange={handleInputChange}
                                                className="hidden"
                                            />
                                            {/* Cloud icon with circular background */}
                                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                <svg
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="text-[#1A2853]"
                                                >
                                                    <path
                                                        d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM14 13V17H10V13H7L12 8L17 13H14Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-[16px] text-[#0F172A] mb-1">
                                                <span className="font-bold text-[#1A2853]">Click to upload</span>
                                                {' '}or drag and drop
                                            </p>
                                            <p className="text-[14px] text-[#94A3B8]">
                                                SVG, PNG, JPG (MAX 5MB)
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-4 mt-6">
                                            <button
                                                type="button"
                                                disabled={!photoPreview}
                                                className="flex items-center gap-2 px-6 py-3 border border-[#E2E8F0] rounded-xl text-[14px] font-semibold text-[#475569] bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M6 3v3m0 0v15m0-15h15M6 6H3" />
                                                    <path d="M18 21v-3m0 0v-15m0 15h3m-3 0h-15" />
                                                </svg>
                                                Crop / Adjust
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleRemove}
                                                disabled={!photoPreview}
                                                className="flex items-center gap-2 px-6 py-3 border border-[#FECACA] rounded-xl text-[14px] font-semibold text-[#EF4444] bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                                                </svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Visibility Checkbox */}
                                <div className="bg-[#F1F5F9]/50 rounded-2xl p-5 mb-10 border border-[#E2E8F0]">
                                    <label className="flex items-start gap-4 cursor-pointer">
                                        <div className="relative mt-1">
                                            <input
                                                type="checkbox"
                                                checked={isPublic}
                                                onChange={(e) => setIsPublic(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-6 h-6 border-2 border-[#1A2853] rounded-md bg-white peer-checked:bg-[#1A2853] transition-all flex items-center justify-center">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`scale-0 transition-transform ${isPublic ? 'scale-100' : ''}`}>
                                                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-bold text-[#0F172A]">
                                                Make photo visible to public
                                            </p>
                                            <p className="text-[13px] text-[#64748B] leading-snug">
                                                Unchecking this limits the visibility to registered clients only.
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center gap-5">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-8 py-4 border border-[#E2E8F0] rounded-xl text-[#0F172A] text-[15px] font-bold hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-95"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-10 py-4 bg-[#1A2853] text-white rounded-xl font-bold text-[15px] flex items-center justify-center gap-3 hover:bg-[#23356D] transition-all shadow-lg shadow-[#1A2853]/20 active:scale-[0.98]"
                                    >
                                        Continue
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Section - Info Panel */}
                        <div className="bg-[#1A2853] p-12 text-white flex flex-col items-center justify-center">
                            {/* Boost Your Visibility Card */}
                            <div className="w-full bg-[#334155]/40 rounded-[24px] p-8 border border-white/5 mb-12 shadow-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 6L13.5 14.5L8.5 9.5L2 16" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 6H22V12" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <h3 className="text-[20px] font-bold tracking-tight">Boost Your Visibility</h3>
                                </div>
                                <p className="text-[15px] text-[#CBD5E1] leading-relaxed">
                                    Profiles with a professional photo receives <span className="font-bold text-white">3x more inquiries</span> from potential clients. It builds instant trust and credibility.
                                </p>
                            </div>

                            {/* Photo Requirements */}
                            <div className="w-full px-2">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="text-white">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                            <circle cx="12" cy="13" r="4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[20px] font-bold">Photo Requirements</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 text-[15px]">
                                        <div className="flex-shrink-0 w-5 h-5 rounded bg-green-600 flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6L9 17L4 12" />
                                            </svg>
                                        </div>
                                        <span className="text-white">High resolution, clear image</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-[15px]">
                                        <div className="flex-shrink-0 w-5 h-5 rounded bg-green-600 flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6L9 17L4 12" />
                                            </svg>
                                        </div>
                                        <span className="text-white">Professional attire recommended</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-[15px]">
                                        <div className="flex-shrink-0 w-5 h-5 rounded bg-green-600 flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6L9 17L4 12" />
                                            </svg>
                                        </div>
                                        <span className="text-white">Neutral background recommended</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-[15px]">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-red-600 flex items-center justify-center">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 6L6 18M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <span className="text-white">Avoid group photos or selfie</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-10">
                        <p className="text-[13px] text-[#94A3B8] italic">
                            Your details will be verified before your profile goes live.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
