'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '../app/actions/auth';
import { useAuthStore } from '../store/authStore';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logoutAction();
      if (result.success) {
        clearAuth();
        router.push('/login');
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}

