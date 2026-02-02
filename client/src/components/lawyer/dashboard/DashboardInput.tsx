'use client';

import { InputHTMLAttributes } from 'react';

import { LucideIcon } from 'lucide-react';

interface DashboardInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
    icon?: LucideIcon;
}

export default function DashboardInput({
    label,
    error,
    helperText,
    icon: Icon,
    className = '',
    ...props
}: DashboardInputProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={props.id || props.name} className="text-sm font-bold text-[#1E3A5F]">
                {label}
                {props.required && <span className="text-rose-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    {...props}
                    className={`w-full ${Icon ? 'pl-11' : 'px-4'} py-3 bg-white border ${error ? 'border-rose-500' : 'border-slate-200'
                        } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 focus:border-[#1E3A5F] transition-all placeholder:text-slate-400`}
                />
            </div>
            {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
            {helperText && !error && <p className="text-xs text-slate-400">{helperText}</p>}
        </div>
    );
}
