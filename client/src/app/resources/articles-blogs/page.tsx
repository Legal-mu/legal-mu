'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ArticlesBlogsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A2542] mb-8">Articles / Blogs</h1>
                    <p className="text-xl text-gray-600">Stay informed with our latest legal articles and blog posts.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
