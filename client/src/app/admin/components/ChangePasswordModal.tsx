'use client';

import React, { useState } from 'react';
import { X, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.changeAdminPassword({
                currentPassword,
                newPassword,
            });

            if (!response.success) {
                throw new Error(response.message || 'Failed to change password');
            }

            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Lock size={18} className="text-[#1e3a8a]" />
                        Change Password
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {success ? (
                        <div className="py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">Password Changed!</h4>
                            <p className="text-gray-500 mt-2">Your password has been updated successfully.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>

                            <hr className="my-2 border-gray-100" />

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">Minimum 8 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2.5 bg-[#1e3a8a] text-white rounded-xl font-semibold hover:bg-[#1a337a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Password'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
