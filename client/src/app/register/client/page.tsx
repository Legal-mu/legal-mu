'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    UserIcon,
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function ClientRegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    return (
        <div className="min-h-screen bg-[#F3F4F7] flex flex-col font-sans">
            {/* Header */}
            <header className="w-full bg-white py-6 px-12 md:px-16 flex justify-between items-center border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <Image
                        src="/legal-mu-logo.webp"
                        alt="LEGAL.MU"
                        width={150}
                        height={70}
                        className="h-12 w-auto"
                    />
                </div>
                <div className="text-sm">
                    <span className="text-gray-400">Already have an account? </span>
                    <Link href="/login" className="font-bold text-[#111827] hover:underline ml-1">
                        Login
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-6 md:p-15">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row max-w-5xl w-full min-h-[850px] m-auto shadow-2xl rounded-[2rem] overflow-hidden bg-white"
                >
                    {/* Left Column - Form */}
                    <div className="flex-[1.2] p-10 md:p-14 lg:p-16 flex flex-col justify-center bg-white">
                        <div className="max-w-md mx-auto w-full">
                            <h1 className="text-4xl font-extrabold text-[#111827] mb-2 tracking-tight">Create Your Account</h1>
                            <p className="text-gray-400 mb-10 text-lg font-medium leading-tight">
                                Connect with top lawyer and manage your cases securely.
                            </p>

                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-bold text-[#111827] mb-2 ml-1">Full Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="eg. Messi"
                                            className="w-full bg-[#F3F4F6] border-[#1E293B] rounded-lg py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#1E293B] transition-all pr-14 text-sm text-[#111827]"
                                        />
                                        <UserIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-sm font-bold text-[#111827] mb-2 ml-1">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="eg. messi@exmaple.com"
                                            className="w-full bg-[#F3F4F6] border-[#1E293B] rounded-lg py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#1E293B] transition-all pr-14 text-sm text-[#111827]"
                                        />
                                        <EnvelopeIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#111827] ml-1">Phone Number</label>
                                    <div className="flex gap-3">
                                        <div className="flex items-center gap-2 bg-[#F3F4F6] rounded-full px-4 py-4 cursor-pointer hover:bg-gray-200 transition-colors">
                                            <Image src="https://flagcdn.com/mu.svg" alt="MU" width={22} height={16} className="rounded-sm" />
                                            <span className="text-sm font-medium text-[#111827]">+230</span>
                                            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="5814976"
                                            className="flex-grow bg-[#F3F4F6] border-[#1E293B] rounded-lg py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#1E293B] transition-all text-sm text-[#111827]"
                                        />
                                    </div>
                                </div>

                                {/* Create Password */}
                                <div>
                                    <label className="block text-sm font-bold text-[#111827] mb-2 ml-1">Create Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="xxxxxxxxx"
                                            className="w-full bg-[#F3F4F6] border-[#1E293B] rounded-lg py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#1E293B] transition-all pr-14 text-sm text-[#111827]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2 font-medium ml-1">Must contain atleast 8 characters, one uppercase and one number</p>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-bold text-[#111827] mb-2 ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="xxxxxxxxx"
                                            className="w-full bg-[#F3F4F6] border-[#1E293B] rounded-lg py-4 px-6 focus:outline-none focus:ring-2 focus:ring-[#1E293B] transition-all pr-14 text-sm text-[#111827]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Terms and Privacy */}
                                <div className="flex items-center gap-3 py-1">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={isAgreed}
                                        onChange={(e) => setIsAgreed(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-[#1E293B] focus:ring-[#1E293B] bg-[#F3F4F6]"
                                    />
                                    <label htmlFor="terms" className="text-xs text-[#111827] font-medium leading-tight">
                                        I agree to the <Link href="/terms" className="font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="font-bold hover:underline">Privacy Policy</Link>
                                    </label>
                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#1A2542] hover:bg-[#111827] text-white font-bold py-4 rounded-lg transition-all shadow-lg text-md"
                                >
                                    Register
                                </button>

                                {/* Divider */}
                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-100"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="bg-white px-4 text-gray-400 font-bold uppercase tracking-tight text-[10px]">or register with</span>
                                    </div>
                                </div>

                                {/* Google Button */}
                                <div className="w-full">
                                    <GoogleLoginButton />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Marketing Content */}
                    <div className="hidden md:flex flex-1 relative bg-[#121E3E]">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/legal_hero_bg.png"
                                alt="Branding"
                                fill
                                className="object-cover opacity-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#121E3E]/30 via-[#121E3E]/60 to-[#121E3E]/90"></div>
                        </div>

                        {/* Marketing Content */}
                        <div className="relative z-10 w-full h-full p-6 lg:p-8 flex flex-row justify-center text-white">
                            <div className="max-w-2xl mt-auto mb-15">
                                <h2 className="text-3xl lg:text-3xl font-semibold mb-4 leading-[1.1] tracking-tight">
                                    Trusted by 10,000+ Clients
                                </h2>
                                <p className="text-gray-300 text-sm lg:text-base mb-29 leading-relaxed font-small ">
                                    Join the fastest growing legal network in Mauritius. Find the right legal expert for your needs in minutes.
                                </p>

                                {/* Testimonial Card */}
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-white/10 backdrop-blur-6xl max-h-[600px] rounded-[2.5rem] p-3 lg:p-4 border border-white/20 shadow-2xl relative overflow-hidden mb-40"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-2 text-[#FFC107]">
                                        {[...Array(4)].map((_, i) => (
                                            <span key={i} className="text-xl">★</span>
                                        ))}
                                        <span className="text-xl text-white opacity-40">★</span>
                                    </div>
                                    <p className="text-gray-100 text-lg lg:text-base font-medium mb-6 leading-relaxed">
                                        “Legal.mu made finding a corporate lawyer incredibly simple. The platform is intuitive and secure.”
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                                            <Image
                                                src="/avatar1.png"
                                                alt="User"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-[#F9FAFB] text-xs">Bin Salman.</p>
                                            <p className="text-[10px] text-gray-400 font-medium tracking-tight">Small Business Owner</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
