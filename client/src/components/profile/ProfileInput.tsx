'use client';

import { ReactNode } from 'react';

interface ProfileInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    type?: 'text' | 'select' | 'password' | 'email';
    placeholder?: string;
    icon?: ReactNode;
    options?: { value: string; label: string }[];
    disabled?: boolean;
    labelSize?: 'sm' | 'xs';
    labelUppercase?: boolean;
    borderColor?: string;
}

export default function ProfileInput({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    icon,
    options = [],
    disabled = false,
    labelSize = 'sm',
    labelUppercase = false,
    borderColor = '#E2E8F0',
}: ProfileInputProps) {
    const labelClasses = `block text-[#0F172A] font-semibold mb-2 text-sm ${labelUppercase ? 'uppercase tracking-wide' : ''}`;

    const inputBaseClasses = `w-full py-2.5 rounded-xl text-[14px] text-[#64748B] border`;
    const inputPaddingClasses = icon ? 'pl-10 pr-4' : 'px-4';

    if (type === 'select') {
        return (
            <div>
                <label className={labelClasses}>{label}</label>
                <div className="relative">
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        className={`${inputBaseClasses} ${inputPaddingClasses} appearance-none`}
                        style={{
                            backgroundColor: 'rgba(245, 245, 245, 1)',
                            borderColor: borderColor,
                        }}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <label className={labelClasses}>{label}</label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${inputBaseClasses} ${inputPaddingClasses}`}
                    style={{
                        backgroundColor: 'rgba(245, 245, 245, 1)',
                        borderColor: borderColor,
                    }}
                />
            </div>
        </div>
    );
}

// Common icons for profile inputs
export const ProfileIcons = {
    user: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    briefcase: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    ),
    hash: <span className="font-medium">#</span>,
    phone: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    mail: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
    location: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
};
