'use client';

import { useState, useEffect, useTransition, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Jost } from 'next/font/google';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { loginAction } from '../actions/auth';
import { useAuthStore } from '../../store/authStore';
import GoogleLoginButton from '../../components/GoogleLoginButton';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.push(redirect);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const result = await loginAction(formData);

      if (!result.success) {
        setError(result.message || 'Login failed. Please try again.');
      } else {
        // Update Zustand store with user data
        if (result.data && typeof result.data === 'object' && 'id' in result.data) {
          useAuthStore.getState().setAuth(result.data as any);
        }
        // Redirect to dashboard on success
        const redirectPath = searchParams.get('redirect') || '/dashboard';
        router.push(redirectPath);
      }
    });
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-[#f6f8ff] flex flex-col ${jost.className}`}>
      {/* Header */}
      <header className="w-full bg-white py-3 px-12 md:px-16 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/legal-mu-logo.webp"
              alt="LEGAL.MU"
              width={150}
              height={70}
              className="h-12 w-auto cursor-pointer"
            />
          </Link>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link href="/register" className="font-bold text-[#1A2853] hover:underline ml-1">
            Register
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row max-w-4xl w-full m-auto shadow-2xl rounded-[2rem] overflow-hidden bg-white"
        >
          {/* Left Column - Form */}
          <div className="flex-[1.2] p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-3xl font-extrabold text-[#111827] mb-2 tracking-tight">Welcome Back</h1>
              <p className="text-gray-400 mb-6 text-lg font-medium leading-tight">
                Sign in to your account and manage your cases securely.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-md bg-red-50 p-4 mb-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-bold text-[#1A2853] mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="eg. messi@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F3F4F6] border-[#1E293B] rounded-lg py-3 px-6 focus:outline-none focus:ring-2 focus:ring-[#1E293B] transition-all pr-14 text-sm text-[#111827]"
                    />
                    <EnvelopeIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2 ml-1">
                    <label className="block text-sm font-bold text-[#1A2853]">Password</label>
                    <Link href="/forgot-password" className="text-xs font-bold text-[#1A2853] hover:text-[#111827]">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="xxxxxxxxx"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#F3F4F6] border-[#1E293B] rounded-lg py-3 px-6 focus:outline-none focus:ring-2 focus:ring-[#1E293B] transition-all pr-14 text-sm text-[#111827]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#1A2853] hover:bg-[#111827] text-white font-bold py-3 rounded-lg transition-all shadow-lg text-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Signing in...' : 'Sign In'}
                </button>

                {/* Divider */}
                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-4 text-gray-400 font-bold uppercase tracking-tight text-[10px]">or sign in with</span>
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
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#121E3E]/30 via-[#121E3E]/60 to-[#121E3E]/90"></div>
            </div>

            {/* Marketing Content */}
            <div className="relative z-10 w-full h-full p-6 lg:p-8 flex flex-col justify-center text-white">
              <div className="max-w-2xl mt-auto mb-2">
                <h2 className="text-3xl lg:text-3xl font-semibold mb-4 leading-[1.1] tracking-tight">
                  Trusted by 10,000+ Clients
                </h2>
                <p className="text-gray-300 text-sm lg:text-base mb-6 leading-relaxed font-small ">
                  Join the fastest growing legal network in Mauritius. Find the right legal expert for your needs in minutes.
                </p>

                {/* Testimonial Card */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/10 backdrop-blur-6xl max-h-[600px] rounded-[2.5rem] p-4 lg:p-6 border border-white/20 shadow-2xl relative overflow-hidden mb-6"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-2 text-[#FFC107]">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                    <span className="text-xl text-white opacity-40">★</span>
                  </div>
                  <p className="text-gray-100 text-lg lg:text-base font-medium mb-4 leading-relaxed">
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1A2542] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

