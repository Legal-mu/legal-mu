'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/lawyer/dashboard/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { CheckCircle2, AlertCircle, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LawyerDashboard() {
    const { user } = useAuthStore();
    const [profileStatus, setProfileStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const fetchStatus = async () => {
        try {
            const res = await api.getLawyerProfileStatus();
            if (res.success) {
                setProfileStatus(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch profile status:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleSubmitForReview = async () => {
        if (profileStatus?.completionPercentage < 100) return;

        setSubmitting(true);
        try {
            const res = await api.submitProfileForReview();
            if (res.success) {
                setMessage('Your profile has been submitted for review.');
                fetchStatus();
            }
        } catch (err: any) {
            setMessage(err.message || 'Failed to submit profile.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return null; // Handled by Layout

    const isPending = profileStatus?.status === 'PENDING_REVIEW';
    const isApproved = profileStatus?.status === 'APPROVED';
    const isIncomplete = profileStatus?.status === 'INCOMPLETE' || profileStatus?.status === 'REJECTED';

    return (
        <DashboardLayout title="Dashboard Overview">
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold text-[#1E3A5F] mb-2">Welcome back, {user?.firstName}!</h2>
                    <p className="text-[#64748B]">
                        {isApproved
                            ? 'Your profile is live and verified. You can now manage your practice.'
                            : isPending
                                ? 'Your profile is currently under review by our administration.'
                                : 'Complete your profile to start connecting with clients.'}
                    </p>
                </div>

                {/* Status Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Progress Card */}
                    <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 flex flex-col">
                        <h3 className="text-lg font-bold text-[#1E3A5F] mb-6">Profile Completion</h3>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="relative w-48 h-48 mx-auto mb-6">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className="text-slate-100 stroke-current"
                                        strokeWidth="8"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                    ></circle>
                                    <circle
                                        className="text-[#1E3A5F] stroke-current transition-all duration-1000 ease-out"
                                        strokeWidth="8"
                                        strokeDasharray={251.2}
                                        strokeDashoffset={251.2 - (251.2 * (profileStatus?.completionPercentage || 0)) / 100}
                                        strokeLinecap="round"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                    ></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-[#1E3A5F]">{profileStatus?.completionPercentage}%</span>
                                    <span className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Complete</span>
                                </div>
                            </div>

                            {isIncomplete && (
                                <div className="text-center">
                                    <p className="text-sm text-[#64748B] mb-4">
                                        {100 - profileStatus?.completionPercentage}% remaining to unlock review
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Card */}
                    <div className="bg-white rounded-[30px] p-8 shadow-sm border border-slate-100 flex flex-col">
                        <h3 className="text-lg font-bold text-[#1E3A5F] mb-6">Account Status</h3>

                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm mb-6 ${isApproved ? 'bg-emerald-50 text-emerald-600' :
                                        isPending ? 'bg-amber-50 text-amber-600' :
                                            'bg-slate-50 text-slate-600'
                                    }`}>
                                    {isApproved ? <CheckCircle2 size={18} /> :
                                        isPending ? <Clock size={18} /> :
                                            <AlertCircle size={18} />}
                                    {profileStatus?.status.replace('_', ' ')}
                                </div>

                                {isPending && (
                                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                                        <p className="text-amber-800 text-sm leading-relaxed">
                                            Your profile is being reviewed. This usually takes <strong>24-48 working hours</strong>.
                                            We will notify you via email once approved.
                                        </p>
                                    </div>
                                )}

                                {isApproved && (
                                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800 text-sm leading-relaxed">
                                        Congratulations! Your profile is approved. You can now subscribe to a plan to start receiving leads.
                                        <button className="mt-4 w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors">
                                            View Subscription Plans
                                        </button>
                                    </div>
                                )}

                                {isIncomplete && (
                                    <div className="space-y-4">
                                        <p className="text-[#64748B] text-sm">
                                            Complete all required fields in the profile steps to submit for review.
                                        </p>

                                        {profileStatus?.missingFields?.length > 0 && (
                                            <div>
                                                <p className="text-xs font-bold text-[#1E3A5F] uppercase mb-2">Missing Items:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {profileStatus.missingFields.slice(0, 5).map((field: string) => (
                                                        <span key={field} className="px-2.5 py-1 bg-slate-100 text-[#64748B] text-[10px] rounded-md font-medium">
                                                            {field.replace(/([A-Z])/g, ' $1').trim()}
                                                        </span>
                                                    ))}
                                                    {profileStatus.missingFields.length > 5 && (
                                                        <span className="text-[10px] text-[#64748B] font-medium">+{profileStatus.missingFields.length - 5} more</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {isIncomplete && (
                                <button
                                    onClick={handleSubmitForReview}
                                    disabled={profileStatus?.completionPercentage < 100 || submitting}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${profileStatus?.completionPercentage === 100
                                            ? 'bg-[#1E3A5F] text-white hover:bg-[#2D4A6F]'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {submitting ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Submit for Review
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                {isIncomplete && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { label: 'Step 1', title: 'Professional Info', href: '/lawyer/dashboard/professional-identity' },
                            { label: 'Step 2', title: 'Contact Details', href: '/lawyer/dashboard/contact-information' },
                            { label: 'Step 3', title: 'Practice Areas', href: '/lawyer/dashboard/practice-details' },
                        ].map((step) => (
                            <Link
                                key={step.href}
                                href={step.href}
                                className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:border-[#1E3A5F]/20 hover:shadow-md transition-all group"
                            >
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">{step.label}</p>
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-[#1E3A5F]">{step.title}</h4>
                                    <ArrowRight size={16} className="text-[#1E3A5F] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
