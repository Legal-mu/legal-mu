'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RESOURCE_CATEGORIES, FEATURED_RESOURCES, RECENT_NEWS } from '@/data/resources';

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 bg-gradient-to-br from-green-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-[#1e3a8a] mb-6">Legal Resources</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Access our comprehensive library of free legal guides, templates, FAQs, and stay updated with the latest legal developments in Mauritius.
                    </p>
                </div>
            </section>

            {/* Resource Categories */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Browse by Category</h2>
                    <div className="grid md:grid-cols-4 gap-8 mb-20">
                        {RESOURCE_CATEGORIES.map((category) => (
                            <div
                                key={category.id}
                                className="group bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                <div className="relative z-10">
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">{category.name}</h3>
                                    <p className="text-sm text-gray-600 group-hover:text-white/90 mb-4 transition-colors">{category.description}</p>
                                    <p className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">{category.count} resources</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Featured Resources */}
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Featured Resources</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {FEATURED_RESOURCES.map((resource) => (
                                <div
                                    key={resource.id}
                                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-600 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                                            {resource.category}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                                                {resource.type}
                                            </span>
                                            <span className="text-xs text-gray-500">{resource.pages} pages</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{resource.description}</p>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                        <div className="text-sm text-gray-500">
                                            <div className="flex items-center gap-2 mb-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                {resource.downloadCount.toLocaleString()} downloads
                                            </div>
                                            <div className="text-xs">Updated: {new Date(resource.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                        </div>
                                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Legal News */}
                    <div>
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Legal News</h2>
                            <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                                View All News
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        <div className="space-y-6">
                            {RECENT_NEWS.map((news) => (
                                <div
                                    key={news.id}
                                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-600 transition-all cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
                                            {news.category}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(news.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                        {news.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{news.excerpt}</p>
                                </div>
                            ))}
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Can't Find What You Need?</h2>
                    <p className="text-xl mb-10 text-blue-100 leading-relaxed">
                        Our legal experts are here to help with personalized guidance. Contact us for professional legal assistance tailored to your specific situation.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl hover:scale-105 transform duration-200"
                    >
                        Contact Legal Expert
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
