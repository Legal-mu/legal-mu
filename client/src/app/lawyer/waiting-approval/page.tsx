'use client';

import Link from 'next/link';
import { Clock, ArrowLeft, Mail } from 'lucide-react';
import Header from '@/components/register/Header';

export default function WaitingApprovalPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] font-jost">
            <Header />

            <main className="max-w-2xl mx-auto px-6 py-20 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-sm">
                    <Clock size={48} className="text-amber-500 animate-pulse" />
                </div>

                <h1 className="text-3xl font-extrabold text-[#1E3A5F] mb-4">
                    Profile Under Review
                </h1>

                <p className="text-xl text-[#64748B] mb-8 leading-relaxed">
                    Thank you for completing your profile! Our administration team is now reviewing your information to ensure the highest quality standards.
                </p>

                <div className="bg-white p-8 rounded-[30px] border border-slate-100 shadow-sm w-full mb-10 text-left">
                    <h3 className="font-bold text-[#1E3A5F] mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-[#1E3A5F] text-white rounded-full text-xs flex items-center justify-center">?</span>
                        What happens next?
                    </h3>

                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <p className="text-sm text-[#64748B]">
                                <strong className="text-[#1E3A5F]">Review Process:</strong> We typically approve profiles within <span className="font-bold text-[#1E3A5F]">24-48 working hours</span>.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <p className="text-sm text-[#64748B]">
                                <strong className="text-[#1E3A5F]">Notification:</strong> You will receive an email confirmation once your account is active.
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <p className="text-sm text-[#64748B]">
                                <strong className="text-[#1E3A5F]">Subscription:</strong> After approval, you'll be redirected to select a subscription plan to go live.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link
                        href="/lawyer/dashboard"
                        className="flex-1 max-w-[200px] flex items-center justify-center gap-2 py-4 px-6 bg-[#1E3A5F] text-white rounded-xl font-bold hover:bg-[#2D4A6F] transition-all"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </Link>
                    <a
                        href="mailto:support@legal.mu"
                        className="flex-1 max-w-[200px] flex items-center justify-center gap-2 py-4 px-6 bg-white border border-slate-200 text-[#64748B] rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                        <Mail size={18} />
                        Contact Support
                    </a>
                </div>
            </main>
        </div>
    );
}
