'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { COMMUNITY_STATS, FORUM_TOPICS, SUCCESS_STORIES } from '@/data/community';

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-[#1e3a8a] mb-6">Legal Community</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Join Mauritius's most active legal community. Share experiences, get expert advice, and connect with professionals who understand your legal needs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg">
                            Join Community
                        </Link>
                        <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">
                            Browse Topics
                        </button>
                    </div>
                </div>
            </section>

            {/* Community Stats */}
            <section className="py-20 px-6 bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <h3 className="text-5xl font-bold text-[#1e3a8a] mb-3">{COMMUNITY_STATS.members}</h3>
                            <p className="text-gray-700 font-medium">Community Members</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-5xl font-bold text-[#1e3a8a] mb-3">{COMMUNITY_STATS.discussions}</h3>
                            <p className="text-gray-700 font-medium">Discussions</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-5xl font-bold text-[#1e3a8a] mb-3">{COMMUNITY_STATS.solvedCases}</h3>
                            <p className="text-gray-700 font-medium">Solved Cases</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-5xl font-bold text-[#1e3a8a] mb-3">{COMMUNITY_STATS.expertsOnline}</h3>
                            <p className="text-gray-700 font-medium">Experts Online</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Forum Topics */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Discussions</h2>
                        <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                            View All
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {FORUM_TOPICS.map((topic) => (
                            <div key={topic.id} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:border-blue-600 cursor-pointer">
                                <div className="flex items-start gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                                                {topic.category}
                                            </span>
                                            <span className="text-sm text-gray-500">{topic.lastActivity}</span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                            {topic.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4 leading-relaxed">{topic.excerpt}</p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {topic.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                {topic.replies} replies
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                {topic.views} views
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Real people, real results. See how our community has helped members achieve their legal goals.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {SUCCESS_STORIES.map((story) => (
                            <div key={story.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
                                        {story.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{story.name}</h3>
                                        <p className="text-sm text-gray-600">{story.case}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic mb-6 leading-relaxed">"{story.quote}"</p>
                                <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                                    {story.result}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
