'use client';

import { useState } from 'react';

interface FormInputProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    helperText?: string;
    required?: boolean;
    optional?: boolean;
    badge?: string;
    labelSize?: string;
    marginClass?: string;
}

export default function FormInput({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    helperText,
    required = false,
    optional = false,
    badge,
    labelSize = '14px',
    marginClass = 'mb-5',
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={marginClass}>
            <label htmlFor={name} className="block font-semibold text-[#1A2853] mb-2" style={{ fontSize: labelSize }}>
                {label}
                {required && <span className="text-[#EF4444] ml-0.5">*</span>}
                {optional && <span className="text-[#9CA3AF] font-normal text-[12px] ml-2">Optional</span>}
                {badge && (
                    <span className="ml-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide">
                        {badge}
                    </span>
                )}
            </label>
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full px-4 py-2 border-0 rounded-xl text-[14px] text-[#0F172A] placeholder:text-[#C0C0C0] focus:outline-none focus:ring-1 focus:ring-[#CBD5E1] transition-all"
                    style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {helperText && (
                <p className="text-[11px] text-[#9CA3AF] mt-1.5 leading-relaxed">{helperText}</p>
            )}
        </div>
    );
}
