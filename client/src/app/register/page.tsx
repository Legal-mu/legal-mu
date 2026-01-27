'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/register/Header';
import FormInput from '../../components/register/FormInput';
import FeatureCard from '../../components/register/FeatureCard';

export default function RegisterStep1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    sessionStorage.setItem('registerStep1', JSON.stringify(formData));
    router.push('/register/step-2');
  };

  return (
    <div className="min-h-screen" style={{ background: 'rgba(240, 240, 240, 1)', fontFamily: 'var(--font-jost), Jost, sans-serif' }}>
      <Header />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        {/* Breadcrumb Badge */}
        <div className="my-8">
          <span
            className="inline-flex items-center justify-center gap-[10px] bg-[#8599DF21] border border-slate-200 text-[#1A2853] text-[16px] font-normal leading-[100%] rounded-[20px] w-[210px] h-[23px]"
          >
            <img src="/tick.svg" alt="Check" className="w-[14px] h-[14px]" />
            Top Rated in Mauritius
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-end">
          {/* Left Section - Marketing */}
          <div className="flex flex-col max-w-[626px]">
            {/* Hero Title */}
            <div className="mb-8">
              <h1 className="text-[70px] font-extrabold text-[#0F172A] leading-[100%] tracking-[0%] mb-4">
                Expand Your
              </h1>
              <h1 className="text-[70px] font-extrabold text-[#1A2853] leading-[100%] tracking-[0%]">
                Legal Practice
              </h1>
            </div>

            <p
              className="text-[23px] font-normal leading-[135%] tracking-[0%] mb-8"
              style={{ fontFamily: 'var(--font-jost)', color: '#737373' }}
            >
              Join thousands of top-tier legal professionals connecting with high value clients. We handle the marketing and you focus on the law.
            </p>

            {/* Feature Cards */}
            <div className="flex flex-col gap-5 mb-8">
              <FeatureCard
                icon="shield"
                title="Verified Leads"
                description={<>Our AI screening ensures you only talk to serious<br />clients with valid cases.</>}
              />

              <FeatureCard
                icon="dollar"
                title="Secure Payments"
                description={<>Guaranteed payment protection for all<br />consultations booked through us.</>}
              />
            </div>

            {/* Banner Card */}
            <div className="relative rounded-[30px] overflow-hidden w-[626px] h-[305px]">
              <img
                src="/images/scales-banner.png"
                alt="Scales of Justice"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full pt-[18px] pr-[33px] pb-[18px] pl-[33px] flex items-center gap-[10px] z-10">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-[#CBD5E1] border-2 border-[#1E3A5F]" />
                  <div className="w-10 h-10 rounded-full bg-[#94A3B8] border-2 border-[#1E3A5F]" />
                  <div className="w-10 h-10 rounded-full bg-[#64748B] border-2 border-[#1E3A5F]" />
                </div>
                <span className="text-white font-semibold text-[14px]">Join 100+ attorneys today</span>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white p-10 rounded-[30px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-[583px] h-[900px]">
            <h2 className="text-[28px] font-extrabold text-[#0F172A] ">Create Your Account</h2>
            <p className="text-[#111827] text-[22px] leading-[130%] mb-9 font-light">
              Join mauritius legal network. Please enter your account credentials below to get started
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-[13px]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="zaryal@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                labelSize="20px"
                marginClass="mb-8"
              />

              <FormInput
                label="Create Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                helperText="Must contain atleast 8 characters, one uppercase and one number."
                required
                labelSize="20px"
                marginClass="mb-8"
              />

              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter Password...."
                value={formData.confirmPassword}
                onChange={handleChange}
                labelSize="20px"
                marginClass="mb-8"
              />

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mb-8">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#1E3A5F] focus:ring-[#1E3A5F] cursor-pointer"
                />
                <label htmlFor="terms" className="text-[13px] text-[#64748B] leading-relaxed cursor-pointer">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#1E3A5F] font-semibold hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#1E3A5F] font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3A5F] text-white py-4 rounded-xl font-semibold text-[15px] mb-8 flex items-center justify-center gap-2 hover:bg-[#2D4A6F] transition-colors"
              >
                Create Account
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[#9CA3AF] text-[13px]">or register with</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl text-[14px] font-medium text-[#0F172A] hover:bg-slate-50 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl text-[14px] font-medium text-[#0F172A] hover:bg-slate-50 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
