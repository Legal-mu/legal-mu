'use client';

import { useState, useTransition, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Jost } from 'next/font/google';
import { motion } from 'framer-motion';
import { LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { resetPasswordAction } from '../../actions/auth';

const jost = Jost({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        startTransition(async () => {
            const formData = new FormData();
            formData.append('token', token);
            formData.append('newPassword', password);

            const result = await resetPasswordAction(formData);

            if (result.success) {
                setSuccess(true);
                // Redirect after a short delay
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(result.message || 'Failed to reset password. The link may have expired.');
            }
        });
    };

    return (
        <div className={`min-h-screen bg-[#f6f8ff] flex flex-col ${jost.className}`}>
            {/* Header */}
            <header className="w-full bg-white py-4 px-8 md:px-20 flex justify-between items-center shadow-sm z-20 sticky top-0">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Image
                            src="/legal-mu-logo.webp"
                            alt="LEGAL.MU"
                            width={160}
                            height={70}
                            className="h-14 w-auto cursor-pointer"
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="px-6 py-2.5 bg-[#1A2853] text-white rounded-[12px] font-medium hover:bg-[#111827] transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-4 md:p-8 bg-[#f6f8ff]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row max-w-4xl w-full m-auto shadow-2xl rounded-[2rem] overflow-hidden bg-white min-h-[600px]"
                >
                    {/* Left Column - Marketing Content (Dark) */}
                    <div className="hidden md:flex w-full md:w-1/2 relative bg-[#1A2853] min-h-[600px]">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/left-side.jpg"
                                alt="Branding"
                                fill
                                className="object-cover opacity-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A2853] via-[#1A2853]/80 to-[#1A2853]/50 opacity-70"></div>
                        </div>

                        {/* Content overlay */}
                        <div className="relative z-10 w-full h-full p-12 flex flex-col justify-end text-white pb-24">
                            <h2 className="text-4xl font-bold mb-4 leading-tight tracking-tight">
                                Secure Your <br /> Account
                            </h2>
                            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                                Create a strong password to protect your legal dashboard and sensitive information.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white relative">
                        <Link href="/login" className="absolute top-8 left-8 text-gray-400 hover:text-[#1A2853] transition-colors flex items-center gap-1">
                            <ArrowLeftIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">Back</span>
                        </Link>

                        <div className="max-w-md mx-auto w-full mt-8">
                            <h1 className="text-3xl font-bold text-[#111827] mb-2 tracking-tight">Reset Password</h1>
                            <p className="mb-8 text-16px font-normal text-gray-500">
                                Please enter your new password below.
                            </p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                    </div>
                                )}

                                {success && (
                                    <div className="rounded-xl bg-green-50 p-4 border border-green-100">
                                        <h3 className="text-sm font-medium text-green-800">
                                            Password reset successfully! Redirecting you to login...
                                        </h3>
                                    </div>
                                )}

                                {!success && (
                                    <>
                                        {/* New Password */}
                                        <div>
                                            <label className="block text-md font-bold text-[#1A2853] mb-2 ml-1">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="At least 8 characters"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#1A2853]/20 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-[#1A2853]/5 transition-all outline-none text-[#111827] placeholder-gray-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                                                >
                                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label className="block text-md font-bold text-[#1A2853] mb-2 ml-1">Confirm Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Confirm new password"
                                                    required
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#1A2853]/20 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-[#1A2853]/5 transition-all outline-none text-[#111827] placeholder-gray-400"
                                                />
                                                <LockClosedIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isPending}
                                            className="w-full bg-[#1A2853] hover:bg-[#111827] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#1A2853]/20 text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                        >
                                            {isPending ? 'Resetting Password...' : 'Reset Password'}
                                        </button>
                                    </>
                                )}

                            </form>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
