'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import StripeWrapper from '@/components/payment/StripeWrapper';
import { createSubscriptionAction } from '@/app/actions/stripe';

function CheckoutForm({ setPaymentStatus }: { setPaymentStatus: (s: any) => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            // Confirm payment on frontend using Elements
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/pricing-plan/details?status=success`,
                },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message || 'Payment failed');
                setPaymentStatus('failed');
            } else {
                setPaymentStatus('success');
            }
        } catch (err: any) {
            setErrorMessage(err.message);
            setPaymentStatus('failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <PaymentElement />
            {errorMessage && <div className="text-red-500 font-['Jost'] text-[14px]">{errorMessage}</div>}
            <button
                type="submit"
                disabled={!stripe || isLoading}
                className="w-full py-5 bg-[#1A2853] text-white rounded-full font-['Jost'] font-semibold text-[18px] hover:bg-[#2A3B73] transition-all flex items-center justify-center gap-2 mb-6 shadow-lg shadow-[#1A2853]/20 disabled:opacity-50"
            >
                {isLoading ? 'Processing...' : 'Complete Payment'}
                {!isLoading && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                )}
            </button>
        </form>
    );
}

export default function PaymentDetailsPage() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initSubscription = async () => {
            try {
                // We're using 'superior' as the default plan for now
                // In a real app, this would come from a URL param or state
                const data = await createSubscriptionAction('superior');

                if (data.success) {
                    setClientSecret(data.clientSecret);
                } else {
                    setError(data.message || 'Failed to initialize payment');
                }
            } catch (err) {
                setError('Could not connect to payment server');
            }
        };

        initSubscription();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-[#F6F8FF] flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center">
                    <h2 className="text-red-600 font-bold text-xl mb-4">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link href="/pricing-plan" className="text-[#1A2853] font-semibold underline">Back to Plans</Link>
                </div>
            </div>
        );
    }

    if (!clientSecret) {
        return (
            <div className="min-h-screen bg-[#F6F8FF] flex items-center justify-center font-['Jost'] text-[#1A2853]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#1A2853] border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-medium">Initializing payment details...</p>
                </div>
            </div>
        );
    }

    return (
        <StripeWrapper options={{ clientSecret }}>
            <PaymentDetailsContent />
        </StripeWrapper>
    );
}

function PaymentDetailsContent() {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [selectedCard, setSelectedCard] = useState<string>('visa1');
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');

    return (
        <main className="min-h-screen bg-[#F6F8FF] relative">
            {/* Header */}
            <header className="fixed w-full top-0 z-50 bg-[#F6F8FF] border-b border-gray-100">
                <div className="relative w-full px-20 py-8 flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image src="/logo.svg" alt="Legal.mu Logo" width={180} height={50} className="object-contain" />
                        </Link>
                    </div>

                    <nav className="absolute left-1/2 top-1/2 transform -translate-x-[55%] -translate-y-1/2 hidden lg:flex items-center bg-white border border-[#1A2853]/20 rounded-full px-48 py-5 shadow-sm">
                        <div className="flex items-center gap-16">
                            <Link href="/" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">Home</Link>
                            <Link href="/lawyers" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">Lawyers Directory</Link>
                            <Link href="/community" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">Community</Link>
                            <Link href="/resources" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">Resources</Link>
                        </div>
                    </nav>

                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
                        <Image src="/lawyer-placeholder.png" alt="User" width={48} height={48} className="object-cover" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className={`pt-48 px-10 pb-20 max-w-[1300px] mx-auto flex gap-10 transition-all duration-300 ${paymentStatus !== 'idle' ? 'blur-sm pointer-events-none' : ''}`}>
                {/* Left Side: Payment Details */}
                <div className="flex-1 bg-white rounded-[32px] p-16 shadow-sm border border-gray-100">
                    <h1 className="font-['Jost'] font-bold text-[48px] text-[#1A2853] uppercase tracking-wide mb-12">
                        Payment Details
                    </h1>

                    {/* Payment Method */}
                    <div className="mb-12">
                        <h2 className="font-['Jost'] font-bold text-[28px] text-[#1A2853] mb-6">Payment Method</h2>
                        <div className="space-y-4">
                            <label className="flex items-center gap-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="method"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                    className="w-5 h-5 accent-[#1A2853]"
                                />
                                <span className={`font-['Jost'] text-[20px] ${paymentMethod === 'card' ? 'text-[#1A2853] font-semibold' : 'text-[#64748B]'}`}>
                                    Credit Card
                                </span>
                            </label>
                            <label className="flex items-center gap-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="method"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={() => setPaymentMethod('paypal')}
                                    className="w-5 h-5 accent-[#1A2853]"
                                />
                                <span className={`font-['Jost'] text-[20px] ${paymentMethod === 'paypal' ? 'text-[#1A2853] font-semibold' : 'text-[#64748B]'}`}>
                                    PayPal
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Saved Cards */}
                    <div>
                        <h2 className="font-['Jost'] font-bold text-[28px] text-[#1A2853] mb-8">Saved Cards</h2>
                        <div className="space-y-6">
                            {/* Card 1 */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/30">
                                <div className="flex items-center gap-6">
                                    <input
                                        type="radio"
                                        name="selectedCard"
                                        checked={selectedCard === 'visa1'}
                                        onChange={() => setSelectedCard('visa1')}
                                        className="w-5 h-5 accent-[#1A2853]"
                                    />
                                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-100 flex items-center justify-center">
                                        <span className="font-bold text-[#1A1F71] text-xl italic">VISA</span>
                                    </div>
                                    <span className="font-['Jost'] text-[18px] text-[#1A2853] font-medium">Visa Card ****4421</span>
                                </div>
                                <button className="flex items-center gap-1 text-[#64748B] hover:text-[#1A2853] font-['Jost'] text-[16px]">
                                    Edit
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Card 2 */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/30">
                                <div className="flex items-center gap-6">
                                    <input
                                        type="radio"
                                        name="selectedCard"
                                        checked={selectedCard === 'master'}
                                        onChange={() => setSelectedCard('master')}
                                        className="w-5 h-5 accent-[#1A2853]"
                                    />
                                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-100 flex items-center justify-center gap-1">
                                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                        <div className="w-4 h-4 bg-yellow-400 rounded-full -ml-2"></div>
                                    </div>
                                    <span className="font-['Jost'] text-[18px] text-[#1A2853] font-medium">Master Card ****7890</span>
                                </div>
                                <button className="flex items-center gap-1 text-[#64748B] hover:text-[#1A2853] font-['Jost'] text-[16px]">
                                    Edit
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Card 3 */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/30">
                                <div className="flex items-center gap-6">
                                    <input
                                        type="radio"
                                        name="selectedCard"
                                        checked={selectedCard === 'visa2'}
                                        onChange={() => setSelectedCard('visa2')}
                                        className="w-5 h-5 accent-[#1A2853]"
                                    />
                                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-100 flex items-center justify-center">
                                        <span className="font-bold text-[#1A1F71] text-xl italic">VISA</span>
                                    </div>
                                    <span className="font-['Jost'] text-[18px] text-[#1A2853] font-medium">Visa Card ****4421</span>
                                </div>
                                <button className="flex items-center gap-1 text-[#64748B] hover:text-[#1A2853] font-['Jost'] text-[16px]">
                                    Edit
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Add New Card */}
                            <button className="flex items-center gap-3 font-['Jost'] font-bold text-[20px] text-[#111827] mt-8 hover:text-[#1A2853] transition-colors">
                                <div className="w-8 h-8 rounded-full border-2 border-[#111827] flex items-center justify-center">
                                    <span className="text-2xl mt-[-2px]">+</span>
                                </div>
                                Add New Card
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Subscription Plan */}
                <div className="w-[440px]">
                    <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 sticky top-48">
                        <h2 className="font-['Jost'] font-bold text-[24px] text-[#1A2853] uppercase tracking-wide mb-8">
                            Subscription Plan
                        </h2>

                        <div className="flex items-start justify-between mb-8 pb-8 border-b border-gray-100">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#1A2853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                hide
                                <div>
                                    <h3 className="font-['Jost'] font-bold text-[20px] text-[#1A2853]">Superior Plan</h3>
                                    <p className="font-['Jost'] text-[14px] text-[#64748B]">Monthly Subscription</p>
                                </div>
                            </div>
                            <span className="font-['Jost'] font-bold text-[20px] text-[#1A2853]">$40.00</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between font-['Jost'] text-[16px]">
                                <span className="text-[#64748B]">Subtotal</span>
                                <span className="text-[#1A2853] font-medium">$40.00</span>
                            </div>
                            <div className="flex justify-between font-['Jost'] text-[16px]">
                                <span className="text-[#64748B]">VAT (15%)</span>
                                <span className="text-[#1A2853] font-medium">$6.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-10 pt-8 border-t border-gray-100">
                            <span className="font-['Jost'] font-bold text-[24px] text-[#1A2853]">Total</span>
                            <div className="text-right">
                                <div className="font-['Jost'] font-bold text-[40px] text-[#1A2853] leading-none">$46.00</div>
                                <span className="font-['Jost'] font-bold text-[16px] text-[#64748B]">USD</span>
                            </div>
                        </div>

                        <CheckoutForm setPaymentStatus={setPaymentStatus} />

                        <div className="flex items-center justify-center gap-2">
                            <span className="font-['Jost'] text-[14px] text-[#64748B]">Powered by</span>
                            <span className="font-bold text-[#635BFF] text-xl">stripe</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className={`w-full bg-white border-t border-gray-200 py-6 mt-20 transition-all duration-300 ${paymentStatus !== 'idle' ? 'blur-sm pointer-events-none' : ''}`}>
                <div className="text-center">
                    <p className="font-['Jost'] text-[14px] text-[#64748B]">
                        © 2025 LEGAL.MU Lawfirm. All Rights Reserved
                    </p>
                </div>
            </footer>

            {/* Modals */}
            {paymentStatus === 'success' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-[600px] p-12 text-center relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setPaymentStatus('idle')}
                            className="absolute right-8 top-8 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="w-20 h-20 bg-[#1A2853] rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h2 className="font-['Jost'] font-bold text-[36px] text-[#1A2853] mb-4">Payment Successful!</h2>
                        <p className="font-['Jost'] text-[18px] text-[#64748B] mb-12">
                            Your payment has been processed successfully.<br />
                            Your subscription is now active.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/dashboard" className="flex-1 py-4 bg-[#1A2853] text-white rounded-full font-['Jost'] font-semibold text-[16px] hover:bg-[#2A3B73] transition-all flex items-center justify-center gap-2">
                                Go to Dashboard
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <button className="flex-1 py-4 border border-[#E2E8F0] text-[#64748B] rounded-full font-['Jost'] font-semibold text-[16px] hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                Download Receipt
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {paymentStatus === 'failed' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-[600px] p-12 text-center relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setPaymentStatus('idle')}
                            className="absolute right-8 top-8 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="w-20 h-20 bg-[#1A2853] rounded-full flex items-center justify-center mx-auto mb-8">
                            <span className="text-white text-[40px] font-bold">!</span>
                        </div>

                        <h2 className="font-['Jost'] font-bold text-[36px] text-[#1A2853] mb-4">Payment Failed!</h2>
                        <p className="font-['Jost'] text-[18px] text-[#64748B] mb-12">
                            We were unable to process your payment.<br />
                            Please try again or use a different payment method.
                        </p>

                        <button
                            onClick={() => setPaymentStatus('idle')}
                            className="w-full py-4 bg-[#1A2853] text-white rounded-full font-['Jost'] font-semibold text-[16px] hover:bg-[#2A3B73] transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
