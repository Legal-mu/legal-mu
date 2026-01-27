'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { ProfileLayout } from '@/components/profile';

export default function BioMediaPage() {
    const [formData, setFormData] = useState({
        uniqueValueProposition: '',
        awardsRecognition: '',
    });
    const [headshot, setHeadshot] = useState<string | null>(null);
    const [biographyLength, setBiographyLength] = useState(0);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeadshot(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveHeadshot = () => {
        setHeadshot(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const biographyContent = editorRef.current?.innerHTML || '';
        console.log('Form submitted:', { ...formData, biography: biographyContent, headshot });
    };

    const applyFormat = useCallback((command: string) => {
        document.execCommand(command, false);
        editorRef.current?.focus();

        // Update active formats state
        setActiveFormats(prev => ({
            ...prev,
            [command]: !prev[command as keyof typeof prev],
        }));
    }, []);

    const applyListFormat = useCallback((command: string) => {
        document.execCommand(command, false);
        editorRef.current?.focus();
    }, []);

    const handleEditorInput = () => {
        const text = editorRef.current?.innerText || '';
        setBiographyLength(text.length);
    };

    // Check active formats when selection changes
    const checkActiveFormats = useCallback(() => {
        setActiveFormats({
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
        });
    }, []);

    useEffect(() => {
        const editor = editorRef.current;
        if (editor) {
            editor.addEventListener('keyup', checkActiveFormats);
            editor.addEventListener('mouseup', checkActiveFormats);
            return () => {
                editor.removeEventListener('keyup', checkActiveFormats);
                editor.removeEventListener('mouseup', checkActiveFormats);
            };
        }
    }, [checkActiveFormats]);

    return (
        <ProfileLayout
            activeSection="bio"
            breadcrumb="Bio & Media"
            title="Biography & Media"
            subtitle="Manage your professional introduction and public facing visuals."
            profileCompletion={80}
        >
            {/* Form Card */}
            <div className="bg-white rounded-2xl px-12 py-10 w-full">
                <form onSubmit={handleSubmit}>
                    {/* Professional Headshot Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.5">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            </div>
                            <h2 className="text-[#0F172A] text-xl font-semibold">Professional Headshot</h2>
                        </div>

                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-[#64748B] text-sm mb-4">
                                    Upload a professional photo to build trust. This will be the first thing clients see.<br />
                                    Max 5MB, JPG/PNG. Min 400x400px.
                                </p>
                                <div className="flex gap-3">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="headshot-upload"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white rounded-xl text-sm font-medium hover:bg-[#2D4A6F] transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                        Upload Now
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Adjust
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleRemoveHeadshot}
                                        className="flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div className="ml-6">
                                <div
                                    className="w-[120px] h-[120px] rounded-full bg-[#F5F5F5] flex items-center justify-center overflow-hidden border border-[#E2E8F0]"
                                    style={{
                                        padding: '39px 38px 39px 38px',
                                        opacity: 1,
                                        transform: 'rotate(0deg)'
                                    }}
                                >
                                    {headshot ? (
                                        <img src={headshot} alt="Headshot preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    )}
                                </div>
                                <p className="text-[#64748B] text-xs text-center mt-2">Preview</p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Biography Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A5F" strokeWidth="1.5">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <h2 className="text-[#0F172A] text-xl font-semibold">Professional Biography</h2>
                        </div>

                        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                            {/* Toolbar */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                <button
                                    type="button"
                                    onClick={() => applyFormat('bold')}
                                    className={`w-9 h-9 flex items-center justify-center rounded text-lg font-bold transition-colors ${activeFormats.bold
                                        ? 'bg-[#1E3A5F] text-white'
                                        : 'hover:bg-[#E2E8F0] text-[#64748B]'
                                        }`}
                                    title="Bold (Ctrl+B)"
                                >
                                    B
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyFormat('italic')}
                                    className={`w-9 h-9 flex items-center justify-center rounded text-lg italic transition-colors ${activeFormats.italic
                                        ? 'bg-[#1E3A5F] text-white'
                                        : 'hover:bg-[#E2E8F0] text-[#64748B]'
                                        }`}
                                    title="Italic (Ctrl+I)"
                                >
                                    I
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyFormat('underline')}
                                    className={`w-9 h-9 flex items-center justify-center rounded text-lg underline transition-colors ${activeFormats.underline
                                        ? 'bg-[#1E3A5F] text-white'
                                        : 'hover:bg-[#E2E8F0] text-[#64748B]'
                                        }`}
                                    title="Underline (Ctrl+U)"
                                >
                                    U
                                </button>
                                <div className="w-px h-6 bg-[#CBD5E1] mx-2" />
                                <button
                                    type="button"
                                    onClick={() => applyListFormat('insertOrderedList')}
                                    className="w-9 h-9 flex items-center justify-center rounded hover:bg-[#E2E8F0] transition-colors"
                                    title="Numbered List"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5">
                                        <line x1="10" y1="6" x2="21" y2="6" />
                                        <line x1="10" y1="12" x2="21" y2="12" />
                                        <line x1="10" y1="18" x2="21" y2="18" />
                                        <text x="3" y="7" fontSize="6" fill="#64748B" fontFamily="sans-serif">1</text>
                                        <text x="3" y="13" fontSize="6" fill="#64748B" fontFamily="sans-serif">2</text>
                                        <text x="3" y="19" fontSize="6" fill="#64748B" fontFamily="sans-serif">3</text>
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyListFormat('insertUnorderedList')}
                                    className="w-9 h-9 flex items-center justify-center rounded hover:bg-[#E2E8F0] transition-colors"
                                    title="Bullet List"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5">
                                        <line x1="9" y1="6" x2="20" y2="6" />
                                        <line x1="9" y1="12" x2="20" y2="12" />
                                        <line x1="9" y1="18" x2="20" y2="18" />
                                        <circle cx="4" cy="6" r="2" fill="#64748B" stroke="none" />
                                        <circle cx="4" cy="12" r="2" fill="#64748B" stroke="none" />
                                        <circle cx="4" cy="18" r="2" fill="#64748B" stroke="none" />
                                    </svg>
                                </button>
                                <div className="w-px h-6 bg-[#CBD5E1] mx-2" />
                            </div>
                            {/* Content Editable Area */}
                            <div
                                ref={editorRef}
                                contentEditable
                                onInput={handleEditorInput}
                                onKeyUp={checkActiveFormats}
                                onMouseUp={checkActiveFormats}
                                className="w-full min-h-[120px] px-4 py-3 text-sm text-[#0F172A] outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#94A3B8]"
                                data-placeholder="Start typing your biography here... Structure it with paragraphs for better readability. Mention your education, years of experience and key achievements."
                                style={{ whiteSpace: 'pre-wrap' }}
                            />
                            <div className="flex justify-end px-4 py-2 text-xs text-[#94A3B8] border-t border-[#E2E8F0]">
                                {biographyLength}/2500 characters
                            </div>
                        </div>
                    </div>

                    {/* Unique Value Proposition & Awards */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-[#0F172A] text-sm font-semibold mb-1">Unique Value Proposition</label>
                            <p className="text-[#94A3B8] text-xs mb-2">One powerful sentence that sets you apart from other lawyers.</p>
                            <textarea
                                name="uniqueValueProposition"
                                value={formData.uniqueValueProposition}
                                onChange={handleChange}
                                placeholder="eg. Committed to providing excellence."
                                className="w-full h-24 px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F5F5F5] text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[#0F172A] text-sm font-semibold mb-1">Awards & Recognition</label>
                            <p className="text-[#94A3B8] text-xs mb-2">List your notable accolades, one per line.</p>
                            <textarea
                                name="awardsRecognition"
                                value={formData.awardsRecognition}
                                onChange={handleChange}
                                placeholder={"Top Lawyer 2023\nExcellence in litigation award"}
                                className="w-full h-24 px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F5F5F5] text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-8 py-3 border border-[#E2E8F0] rounded-xl text-[#0F172A] font-medium text-sm hover:bg-[#F8FAFC] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#1E3A5F] rounded-xl text-white font-medium text-sm hover:bg-[#2D4A6F] transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
}
