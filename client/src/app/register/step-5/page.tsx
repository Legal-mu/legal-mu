'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterStep5() {
    const router = useRouter();
    const editorRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        biography: '',
        uniqueValueProposition: '',
    });
    const [charCount, setCharCount] = useState(0);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        orderedList: false,
        unorderedList: false,
    });

    useEffect(() => {
        const step1Data = sessionStorage.getItem('registerStep1');
        const step2Data = sessionStorage.getItem('registerStep2');
        const step3Data = sessionStorage.getItem('registerStep3');
        const step4Data = sessionStorage.getItem('registerStep4');
        if (!step1Data || !step2Data || !step3Data || !step4Data) {
            router.push('/register');
        }
    }, [router]);

    const handleBack = () => {
        router.push('/register/step-4');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Get the HTML content from the editor
        const biographyHtml = editorRef.current?.innerHTML || '';
        const dataToSave = {
            ...formData,
            biography: biographyHtml,
        };
        sessionStorage.setItem('registerStep5', JSON.stringify(dataToSave));
        router.push('/register/step-6');
    };

    // Check current formatting state of selection
    const checkActiveFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            orderedList: document.queryCommandState('insertOrderedList'),
            unorderedList: document.queryCommandState('insertUnorderedList'),
        });
    };

    const applyFormat = (command: string, value?: string) => {
        // Focus the editor first
        editorRef.current?.focus();
        // Apply the formatting command
        document.execCommand(command, false, value);
        // Update character count and check active formats
        updateCharCount();
        checkActiveFormats();
    };

    const updateCharCount = () => {
        const text = editorRef.current?.innerText || '';
        setCharCount(text.length);
        setFormData(prev => ({ ...prev, biography: editorRef.current?.innerHTML || '' }));
    };

    const handleEditorInput = () => {
        updateCharCount();
        checkActiveFormats();
        // Enforce character limit
        const text = editorRef.current?.innerText || '';
        if (text.length > 2500 && editorRef.current) {
            // Truncate text content if over limit
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            const cursorPos = range?.startOffset || 0;

            // Simple truncation - just prevent further input
            editorRef.current.innerText = text.slice(0, 2500);
            setCharCount(2500);
        }
    };

    // Check formats when selection changes (mouse or keyboard)
    const handleSelectionChange = () => {
        checkActiveFormats();
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-jost)' }}>
            {/* Header */}
            <nav className="bg-white px-4 md:px-8 py-5 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <img
                        src="/images/legalmu-logo.png"
                        alt="LEGAL.MU - Access to justice"
                        className="h-10 w-auto"
                    />
                </Link>

                <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#64748B]">Already have an account?</span>
                    <Link href="/login" className="text-[14px] font-semibold text-[#0F172A] hover:underline">
                        Login
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-[calc(100vh-80px)]" style={{ backgroundColor: 'rgba(190, 204, 255, 0.14)' }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
                    <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">

                        {/* Left Section - Showcase Panel */}
                        <div className="lg:sticky lg:top-0 -ml-6 md:-ml-12">
                            <div className="bg-[#F1F5F9] p-8 pr-12 min-h-[calc(100vh-80px)] flex items-center">
                                <div className="text-left">
                                    <h3 className="text-[48px] font-bold text-[#1A2853] leading-[125%] mb-6">
                                        Showcase<br />Your<br />Professional<br />Expertise
                                    </h3>
                                    <p className="text-[18px] font-light text-black leading-[150%]">
                                        Your professional biography is the<br />
                                        cornerstone of your profile. A detailed<br />
                                        history helps clients trust your experience.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Form */}
                        <div className="bg-white p-10 rounded-[20px] border border-[#E2E8F0] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                            {/* Progress Bar - 8 segments, step 5 (current) is filled */}
                            <div className="flex gap-1 mb-8">
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#1E3A5F]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                                <div className="flex-1 h-[4px] rounded-full bg-[#E8EDF5]" />
                            </div>

                            <p className="text-[#64748B] text-[13px] italic mb-1">Step 5 of 8</p>
                            <h2 className="text-[22px] font-bold text-[#0F172A] mb-6">Professional Profile</h2>

                            <form onSubmit={handleSubmit}>
                                {/* Professional Biography */}
                                <div className="mb-6">
                                    <label className="block text-[17px] font-bold text-[#1E3A5F] mb-3">
                                        Professional Biography <span className="text-red-500">*</span>
                                    </label>

                                    {/* Rich Text Editor Toolbar */}
                                    <div className="border border-[#E2E8F0] rounded-t-lg bg-[#F8FAFC]">
                                        <div className="flex items-center gap-4 px-6 py-4 border-b border-[#E2E8F0]">
                                            {/* Bold */}
                                            <button
                                                type="button"
                                                onClick={() => applyFormat('bold')}
                                                className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${activeFormats.bold ? 'bg-[#1E3A5F] text-white' : 'text-[#1E293B] hover:bg-[#E2E8F0]'}`}
                                                title="Bold"
                                            >
                                                <span className="text-[22px] font-bold" style={{ fontFamily: 'Georgia, serif' }}>B</span>
                                            </button>

                                            {/* Italic */}
                                            <button
                                                type="button"
                                                onClick={() => applyFormat('italic')}
                                                className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${activeFormats.italic ? 'bg-[#1E3A5F] text-white' : 'text-[#1E293B] hover:bg-[#E2E8F0]'}`}
                                                title="Italic"
                                            >
                                                <span className="text-[22px] italic" style={{ fontFamily: 'Georgia, serif' }}>I</span>
                                            </button>

                                            {/* Underline */}
                                            <button
                                                type="button"
                                                onClick={() => applyFormat('underline')}
                                                className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${activeFormats.underline ? 'bg-[#1E3A5F] text-white' : 'text-[#1E293B] hover:bg-[#E2E8F0]'}`}
                                                title="Underline"
                                            >
                                                <span className="text-[22px] underline decoration-2 underline-offset-2" style={{ fontFamily: 'Georgia, serif' }}>U</span>
                                            </button>

                                            {/* Separator */}
                                            <div className="w-px h-8 bg-[#CBD5E1] mx-2" />

                                            {/* Ordered List */}
                                            <button
                                                type="button"
                                                onClick={() => applyFormat('insertOrderedList')}
                                                className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${activeFormats.orderedList ? 'bg-[#1E3A5F] text-white' : 'text-[#475569] hover:bg-[#E2E8F0]'}`}
                                                title="Ordered List"
                                            >
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                                    {/* Number column */}
                                                    <text x="2" y="7" fontSize="6" fontWeight="600" fill="currentColor" fontFamily="system-ui">1</text>
                                                    <text x="2" y="13" fontSize="6" fontWeight="600" fill="currentColor" fontFamily="system-ui">2</text>
                                                    <text x="2" y="19" fontSize="6" fontWeight="600" fill="currentColor" fontFamily="system-ui">3</text>
                                                    {/* Lines */}
                                                    <line x1="9" y1="5" x2="22" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <line x1="9" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <line x1="9" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </button>

                                            {/* Unordered List */}
                                            <button
                                                type="button"
                                                onClick={() => applyFormat('insertUnorderedList')}
                                                className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${activeFormats.unorderedList ? 'bg-[#1E3A5F] text-white' : 'text-[#475569] hover:bg-[#E2E8F0]'}`}
                                                title="Bullet List"
                                            >
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                                    {/* Bullets */}
                                                    <circle cx="4" cy="5" r="2" fill="currentColor" />
                                                    <circle cx="4" cy="12" r="2" fill="currentColor" />
                                                    <circle cx="4" cy="19" r="2" fill="currentColor" />
                                                    {/* Lines */}
                                                    <line x1="10" y1="5" x2="22" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <line x1="10" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <line x1="10" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </button>

                                            {/* Separator */}
                                            <div className="w-px h-8 bg-[#CBD5E1] mx-2" />
                                        </div>

                                        {/* Contenteditable Editor Area */}
                                        <style>{`
                                            .rich-editor ul {
                                                list-style-type: disc;
                                                padding-left: 24px;
                                                margin: 8px 0;
                                            }
                                            .rich-editor ol {
                                                list-style-type: decimal;
                                                padding-left: 24px;
                                                margin: 8px 0;
                                            }
                                            .rich-editor li {
                                                margin: 4px 0;
                                            }
                                        `}</style>
                                        <div
                                            ref={editorRef}
                                            contentEditable
                                            onInput={handleEditorInput}
                                            onKeyUp={handleSelectionChange}
                                            onMouseUp={handleSelectionChange}
                                            data-placeholder="Start typing your biography here... Structure it with paragraphs for better readability. Mention your education, years of experience and key achievements."
                                            className="rich-editor w-full px-4 py-4 min-h-[200px] text-[14px] text-[#0F172A] focus:outline-none bg-white empty:before:content-[attr(data-placeholder)] empty:before:text-[#94A3B8] empty:before:pointer-events-none"
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word'
                                            }}
                                        />

                                        {/* Character Count */}
                                        <div className="px-4 py-2 text-right border-t border-[#E2E8F0] bg-white">
                                            <span className="text-[12px] text-[#94A3B8]">
                                                {charCount}/2500 characters
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Unique Value Proposition */}
                                <div className="mb-8">
                                    <label className="block text-[17px] font-bold text-[#1E3A5F] mb-2">
                                        Unique Value Proposition
                                    </label>
                                    <p className="text-[13px] text-[#64748B] mb-3">
                                        A short punchy statement that appears under your name.
                                    </p>

                                    <div className="border border-[#E2E8F0] rounded-lg">
                                        <textarea
                                            value={formData.uniqueValueProposition}
                                            onChange={(e) => setFormData({ ...formData, uniqueValueProposition: e.target.value.slice(0, 250) })}
                                            placeholder='eg "Dedicated to providing accessible legal solutions for small businesses with a focus on transparency and speed."'
                                            className="w-full px-4 py-3 min-h-[80px] text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none resize-none rounded-lg"
                                        />

                                        {/* Character Count */}
                                        <div className="px-4 py-2 text-right">
                                            <span className="text-[12px] text-[#94A3B8]">
                                                {formData.uniqueValueProposition.length}/250
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 border border-[#E2E8F0] rounded-full text-[#0F172A] text-[14px] font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-8 py-3 bg-[#1E3A5F] text-white rounded-full font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#2D4A6F] transition-colors"
                                    >
                                        Continue
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-8">
                        <p className="text-[12px] text-[#94A3B8]">
                            Your details will be verified before your profile goes live.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
