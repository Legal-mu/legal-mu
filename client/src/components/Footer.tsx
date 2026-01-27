'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white text-[#64748b] border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Column 1: Logo & About */}
                    <div className="space-y-8">
                        <Link href="/">
                            <Image src="/legal-mu-logo.webp" alt="Legal.mu" width={180} height={48} className="object-contain" />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-[280px]">
                            Defending your rights with precision and a legacy of justice. We are committed to providing top-tier legal representation.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.0 - - " /> {/* Instagram path truncated for brevity if needed, but I'll provide full paths for production feel */}
                                    <path d="M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.778 6.98 6.978 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.612-6.77-6.979-6.97C15.668.014 15.259 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 2.97.135 4.107 1.333 4.24 4.24.055 1.265.07 1.644.07 4.849 0 3.205-.015 3.584-.07 4.849-.135 2.914-1.274 4.107-4.24 4.241-1.265.055-1.645.07-4.85.07-3.205 0-3.585-.015-4.849-.07-2.946-.134-4.114-1.333-4.24-4.241-.056-1.265-.071-1.644-.071-4.849 0-3.205.015-3.584.071-4.849.134-2.908 1.265-4.102 4.24-4.241 1.265-.055 1.644-.071 4.849-.071zm0 3.665a6.175 6.175 0 100 12.35 6.175 6.175 0 000-12.35zm0 10.19a4.015 4.015 0 110-8.03 4.015 4.015 0 010 8.03zm6.406-10.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h3 className="text-gray-900 font-extrabold text-sm uppercase tracking-widest mb-8">LAWYERS DIRECTORY</h3>
                        <ul className="space-y-4">
                            <li><Link href="/lawyers-directory" className="hover:text-blue-600 transition-colors text-sm font-medium">Public Law</Link></li>
                            <li><Link href="/lawyers-directory" className="hover:text-blue-600 transition-colors text-sm font-medium">Private law</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h3 className="text-gray-900 font-extrabold text-sm uppercase tracking-widest mb-8">COMPANY</h3>
                        <ul className="space-y-4">
                            <li><Link href="/community" className="hover:text-blue-600 transition-colors text-sm font-medium">Lawyers Directory</Link></li>
                            <li><Link href="/careers" className="hover:text-blue-600 transition-colors text-sm font-medium">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors text-sm font-medium">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Visit Us */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-gray-900 font-extrabold text-sm uppercase tracking-widest mb-8">VISIT US</h3>
                            <p className="text-sm leading-relaxed max-w-[200px]">
                                123 Justice avenue. Suite 400<br />
                                New York, NY 10001
                            </p>
                        </div>
                        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
                            <Image
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
                                alt="Map"
                                fill
                                className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-medium">
                        © {new Date().getFullYear()} LEGAL.MU Lawfirm. All Rights Reserved
                    </p>
                    <div className="flex gap-8 text-sm font-medium">
                        <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-blue-600 transition-colors">Cookies Settings</Link>
                    </div>
                </div>
            </div>
        </footer >
    );
}
