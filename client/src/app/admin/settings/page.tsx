'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Lock, Eye } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';

export default function AdminSettings() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
                <p className="text-gray-500 mt-1">Manage your administrative preferences and system configuration.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-50 p-3 rounded-xl text-[#1e3a8a]">
                            <SettingsIcon size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">General Preferences</h3>
                            <p className="text-sm text-gray-500">Configure basic dashboard settings</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Email Notifications</p>
                                <p className="text-xs text-gray-500">Receive alerts for new lawyer registrations</p>
                            </div>
                            <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                                <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Security</h3>
                            <p className="text-sm text-gray-500">Manage two-factor authentication and access</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="text-sm font-semibold text-[#1e3a8a] hover:underline"
                    >
                        Update administrator password
                    </button>
                </div>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 className="font-bold text-red-800 flex items-center gap-2">
                    <Lock size={18} />
                    Maintenance Mode
                </h3>
                <p className="text-sm text-red-700 mt-1 mb-4">Activating maintenance mode will prevent all users except admins from accessing the platform.</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                    Enable Maintenance Mode
                </button>
            </div>

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </div>
    );
}
