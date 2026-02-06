'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Jost } from 'next/font/google';
import { motion } from 'framer-motion';
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { forgotPasswordAction } from '../actions/auth';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);

      const result = await forgotPasswordAction(formData);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || 'Failed to send reset email. Please try again.');
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
          <Link
            href="/register"
            className="text-[#1A2853] font-medium hover:text-[#111827] transition-colors"
          >
            Register
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
                Recover Your <br /> Access
              </h2>
              <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                Securely reset your password and regain control of your legal dashboard immediately.
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
              <h1 className="text-3xl font-bold text-[#111827] mb-2 tracking-tight">Forgot Password?</h1>
              <p className="mb-8 text-16px font-normal text-gray-500">
                Enter your email address and we'll send you a link to reset your password.
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
                      If an account exists with this email, a password reset link has been sent.
                    </h3>
                  </div>
                )}

                {!success && (
                  <>
                    {/* Email Address */}
                    <div>
                      <label className="block text-md font-bold text-[#1A2853] mb-2 ml-1">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="name@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#1A2853]/20 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-[#1A2853]/5 transition-all outline-none text-[#111827] placeholder-gray-400"
                        />
                        <EnvelopeIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#1A2853] hover:bg-[#111827] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#1A2853]/20 text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      {isPending ? 'Sending Link...' : 'Send Reset Link'}
                    </button>
                  </>
                )}

                {success && (
                  <Link
                    href="/login"
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-[#1A2853] font-bold py-4 rounded-xl transition-all mt-4"
                  >
                    Back to Login
                  </Link>
                )}

              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
