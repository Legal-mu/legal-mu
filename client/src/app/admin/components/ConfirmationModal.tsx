'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'primary' | 'danger' | 'success' | 'warning';
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'primary'
}: ConfirmationModalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            // Small delay to trigger animation
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => setIsMounted(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isMounted) return null;

    const variantStyles = {
        primary: {
            bg: 'bg-blue-50',
            icon: <CheckCircle2 className="text-[#1e3a8a]" size={24} />,
            button: 'bg-[#1e3a8a] hover:bg-blue-800 text-white shadow-blue-100',
            border: 'border-blue-100'
        },
        danger: {
            bg: 'bg-red-50',
            icon: <AlertCircle className="text-red-600" size={24} />,
            button: 'bg-red-600 hover:bg-red-700 text-white shadow-red-100',
            border: 'border-red-100'
        },
        success: {
            bg: 'bg-emerald-50',
            icon: <CheckCircle2 className="text-emerald-600" size={24} />,
            button: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100',
            border: 'border-emerald-100'
        },
        warning: {
            bg: 'bg-amber-50',
            icon: <AlertTriangle className="text-amber-600" size={24} />,
            button: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-100',
            border: 'border-amber-100'
        }
    };

    const styles = variantStyles[variant];

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div
                className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className={`p-4 rounded-2xl ${styles.bg} ${styles.border} border mb-6`}>
                            {styles.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-500 leading-relaxed">{message}</p>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3.5 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all border border-gray-100"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95 ${styles.button}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
