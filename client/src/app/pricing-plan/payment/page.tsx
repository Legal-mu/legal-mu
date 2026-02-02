'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PaymentMethodsPage() {
    const [paymentType, setPaymentType] = useState<'card' | 'paypal'>('card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');

    // Format card number display
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    return (
        <main className="min-h-screen bg-[#F6F8FF]">
            {/* Header */}
            <header className="fixed w-full top-0 z-50 bg-[#F6F8FF] border-b border-gray-100">
                <div className="relative w-full px-20 py-8 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                alt="Legal.mu Logo"
                                width={180}
                                height={50}
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Navigation Pill */}
                    <nav className="absolute left-1/2 top-1/2 transform -translate-x-[55%] -translate-y-1/2 hidden lg:flex items-center bg-white border border-[#1A2853]/20 rounded-full px-48 py-5 shadow-sm">
                        <div className="flex items-center gap-16">
                            <Link href="/" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                                Home
                            </Link>
                            <Link href="/lawyers" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                                Lawyers Directory
                            </Link>
                            <Link href="/community" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                                Community
                            </Link>
                            <Link href="/resources" className="text-base font-medium text-[#64748B] hover:text-[#1A2853] transition-colors">
                                Resources
                            </Link>
                        </div>
                    </nav>

                    {/* User Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
                        <Image
                            src="/lawyer-placeholder.png"
                            alt="User"
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-45 px-70 pb-10 mx-auto ">
                {/* Title */}
                <h1 className="font-['Jost'] font-bold text-[60px] text-[#111827] uppercase tracking-wide mb-10">
                    Manage Payment<br />Methods
                </h1>

                {/* Saved Payment Methods */}
                <div className="mb-16">
                    <h2 className="font-['Jost'] font-semibold text-[30px] text-[#1A2853] mb-8">
                        Saved Payment Methods
                    </h2>
                    <div className="flex gap-20">
                        {/* Visa Card 1 */}
                        <div className="bg-white rounded-2xl p-8 w-[400px] h-[200px] border border-gray-200 shadow-sm relative flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-[#1A1F71] text-2xl italic">VISA</span>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-['Jost'] text-[16px] text-[#64748B]">**** **** ****4421</span>
                                <span className="bg-[#1A2853] text-white text-[12px] px-3 py-1 rounded-full font-medium">Default</span>
                            </div>
                        </div>

                        {/* Mastercard */}
                        <div className="bg-white rounded-2xl p-8 w-[400px] h-[200px] border border-gray-200 shadow-sm relative flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="flex">
                                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                                    <div className="w-8 h-8 bg-yellow-400 rounded-full -ml-3"></div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </div>
                            <span className="font-['Jost'] text-[16px] text-[#64748B]">**** **** ****7890</span>
                        </div>

                        {/* Visa Card 2 */}
                        <div className="bg-white rounded-2xl p-8 w-[400px] h-[200px] border border-gray-200 shadow-sm relative flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-[#1A1F71] text-2xl italic">VISA</span>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </div>
                            <span className="font-['Jost'] text-[16px] text-[#64748B]">**** **** ****6309</span>
                        </div>
                    </div>
                </div>

                {/* Add New Card Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-['Jost'] font-semibold text-[28px] text-[#1A2853]">
                            Add New Card
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="font-['Jost'] text-[14px] text-[#64748B]">Credit/Debit Card</span>
                            <button
                                onClick={() => setPaymentType(paymentType === 'card' ? 'paypal' : 'card')}
                                className={`relative w-14 h-7 rounded-full transition-colors ${paymentType === 'paypal' ? 'bg-[#1A2853]' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${paymentType === 'paypal' ? 'left-8' : 'left-1'
                                        }`}
                                />
                            </button>
                            <span className="font-['Jost'] text-[14px] text-[#64748B]">PayPal</span>
                        </div>
                    </div>

                    {/* Credit Card Preview */}
                    <div className="flex justify-center gap-10 mb-30 ml-20">
                        <div className="relative">
                            <Image
                                src="/bank_card.svg"
                                alt="Credit Card"
                                width={440}
                                height={260}
                                className="rounded-2xl shadow-lg object-cover"
                            />
                        </div>

                        {/* Scan Card Button */}
                        <div className="flex items-end">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-[14px] text-[#64748B] hover:bg-gray-50 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Scan Card
                            </button>
                        </div>
                    </div>

                    {/* Card Form */}
                    <div className="space-y-6">
                        {/* Card Number */}
                        <div className="flex flex-col items-center">
                            <div className="w-[70%] text-left">
                                <label className="block font-['Jost'] font-semibold text-[24px] text-[#1A2853] mb-2">
                                    Card Number
                                </label>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter 16 digit card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                maxLength={19}
                                className="w-[70%] px-6 py-4 rounded-xl bg-white border-none font-['Jost'] text-[16px] text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A2853] transition-all shadow-sm"
                            />
                        </div>

                        {/* Cardholder Name */}
                        <div className="flex flex-col items-center">
                            <div className="w-[70%] text-left">
                                <label className="block font-['Jost'] font-semibold text-[24px] text-[#1A2853] mb-2">
                                    Cardholder Name
                                </label>
                            </div>
                            <input
                                type="text"
                                placeholder="As appears on the card"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                className="w-[70%] px-6 py-4 rounded-xl bg-white border-none font-['Jost'] text-[16px] text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A2853] transition-all shadow-sm"
                            />
                        </div>

                        {/* Expiration Date and CVC */}
                        <div className="flex justify-center w-full">
                            <div className="flex gap-8 w-[70%]">
                                <div className="flex-1">
                                    <label className="block font-['Jost'] font-semibold text-[24px] text-[#1A2853] mb-2">
                                        Expiration Date
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={expirationDate}
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                        maxLength={5}
                                        className="w-full px-6 py-4 rounded-xl bg-white border-none font-['Jost'] text-[16px] text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A2853] transition-all shadow-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-['Jost'] font-semibold text-[24px] text-[#1A2853] mb-2">
                                        CVC
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value)}
                                        maxLength={4}
                                        className="w-full px-6 py-4 rounded-xl bg-white border-none font-['Jost'] text-[16px] text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A2853] transition-all shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <div className="flex justify-center">
                        <Link href="/pricing-plan/details" className="w-[60%] mt-20 py-4 bg-[#1A2853] text-white rounded-full font-['Jost'] font-semibold text-[16px] hover:bg-[#2A3B73] transition-all flex items-center justify-center gap-2">
                            Confirm & Add Card
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Powered by Stripe */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <span className="font-['Jost'] text-[18px] text-[#64748B]">Powered by</span>
                        <span className="font-bold text-[28px] text-[#635BFF]">stripe</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-white border-t border-gray-200 py-6 mt-10">
                <div className="text-center">
                    <p className="font-['Jost'] text-[14px] text-[#64748B]">
                        © 2025 LEGAL.MU Lawfirm. All Rights Reserved
                    </p>
                </div>
            </footer>
        </main>
    );
}
