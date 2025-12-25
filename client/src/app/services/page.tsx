'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SERVICES } from '@/data/services';

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-[#1e3a8a] mb-6">Legal Services</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Comprehensive legal solutions tailored to your needs. Our expert attorneys provide professional representation across all practice areas with proven results.
                        </p>
                    </div>

                    {/* Service Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {['All Services', 'Popular', 'Corporate', 'Personal', 'Property'].map((category, idx) => (
                            <button
                                key={idx}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES.map((service) => (
                            <div
                                key={service.id}
                                className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group"
                            >
                                {service.popular && (
                                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{service.description}</p>

                                <div className="mb-6 pb-6 border-b border-gray-100">
                                    <p className="text-sm text-gray-500 mb-1">Fee Range</p>
                                    <p className="text-xl font-bold text-blue-600 mb-3">{service.priceRange}</p>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <p className="text-xs text-gray-600 mb-1">Success Rate</p>
                                            <p className="text-lg font-bold text-green-700">{service.successRate}</p>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <p className="text-xs text-gray-600 mb-1">Avg. Duration</p>
                                            <p className="text-sm font-semibold text-blue-700">{service.avgDuration}</p>
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/register"
                                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
                                >
                                    Get Free Consultation
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Legal.mu?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Trusted by over 2,500 clients across Mauritius for professional legal excellence</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">500+</h3>
                            <p className="text-gray-600 font-medium">Cases Won</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-green-600 mb-2">96%</h3>
                            <p className="text-gray-600 font-medium">Client Satisfaction</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-purple-600 mb-2">20+</h3>
                            <p className="text-gray-600 font-medium">Years Experience</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-4xl font-bold text-orange-600 mb-2">15</h3>
                            <p className="text-gray-600 font-medium">Expert Attorneys</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
                </div>
                <div className="relative max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Expert Legal Consultation?</h2>
                    <p className="text-xl mb-10 text-blue-100 leading-relaxed">
                        Don't wait. Our experienced attorneys are ready to provide the guidance you need. Schedule a free consultation today and take the first step toward resolving your legal matters.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl hover:scale-105 transform duration-200"
                    >
                        Book Free Consultation
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
