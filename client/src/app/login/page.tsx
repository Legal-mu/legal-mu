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
  const [rememberMe, setRememberMe] = useState(false);
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
      // Handle rememberMe if supported by backend, otherwise just local state

      const result = await loginAction(formData);

      if (!result.success) {
        setError(result.message || 'Login failed. Please try again.');
      } else {
        // Update Zustand store with user data
        if (result.data && typeof result.data === 'object' && 'id' in result.data) {
          useAuthStore.getState().setAuth(result.data as any);
        }

        // Redirect based on role
        const user = result.data as any;
        const redirectPath = searchParams.get('redirect') || (user?.role === 'ADMIN' ? '/admin' : '/dashboard');
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
          className="flex flex-col md:flex-row max-w-4xl w-full m-auto shadow-2xl rounded-[2rem] overflow-hidden bg-white min-h-[650px]"
        >
          {/* Left Column - Marketing Content (Dark) */}
          <div className="hidden md:flex w-full md:w-1/2 relative bg-[#1A2853] min-h-[600px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              {/* Use the same hero bg but maybe darker or different positioning if needed */}
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
                Securing Your Legal <br /> Future
              </h2>
              <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                Access your legal dashboard and secure your legal navigation with ease
              </p>
              {/* Decorative elements or graphical placeholder typically go here */}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-4xl font-bold text-[#111827] mb-2 tracking-tight">Welcome Back!</h1>
              <p className="mb-8 text-20px font-normal text-[#1A2853]">
                Access your professional legal portal
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-md font-bold text-[#1A2853] mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="messi@barca.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#1A2853]/20 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-[#1A2853]/5 transition-all outline-none text-[#111827] placeholder-gray-400"
                    />
                    <EnvelopeIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-md font-bold text-[#1A2853] mb-2 ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="xxxxxxxx"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm transition-all checked:border-[#1A2853] checked:bg-[#1A2853] hover:border-[#1A2853]"
                      />
                      <svg
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="12"
                        height="12"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Remember me</span>
                  </label>

                  <Link href="/forgot-password" className="text-sm font-bold text-[#1A2853] hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#1A2853] hover:bg-[#111827] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#1A2853]/20 text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Logging In...' : 'Login'}
                </button>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-4 text-gray-400 font-medium uppercase tracking-wider">or continue with</span>
                  </div>
                </div>

                {/* Google Button */}
                <div className="w-full">
                  {/* We wrap custom styling around the button or ensure the component itself is styled nicely. 
                       Assuming GoogleLoginButton handles its own internal structure, usually it's best to wrap it if needed.
                   */}
                  <div className="[&>button]:w-full [&>button]:justify-center [&>button]:py-3 [&>button]:rounded-xl [&>button]:shadow-sm [&>button]:border [&>button]:border-gray-200 [&>button]:hover:bg-gray-50">
                    <GoogleLoginButton />
                  </div>
                </div>

                <div className="text-center pt-4">
                  <span className="text-sm text-gray-500">Don't have an account? </span>
                  <Link href="/register" className="text-sm font-bold text-[#1A2853] hover:underline">Register</Link>
                </div>

              </form>
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
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FD]">
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

