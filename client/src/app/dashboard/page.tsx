import { redirect } from 'next/navigation';
import { getServerUser } from '../../lib/auth';
import LogoutButton from '../../components/LogoutButton';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import type { User } from '../../types';
import { api } from '../../lib/api';
import { formatDate } from '../../lib/utils';

// Mark this page as dynamic (uses cookies)
export const dynamic = 'force-dynamic';

// Fetch lawyers from API (Admin only)
async function fetchLawyers(): Promise<{ lawyers: User[]; total: number }> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await api.getLawyers({
      headers: {
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    });

    return response.data || { lawyers: [], total: 0 };

  } catch (error) {
    console.error('Error fetching lawyers:', error);
    return { lawyers: [], total: 0 };
  }
}

// Loading component
function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );
}

// Simple Dashboard for Visitors/Lawyers
function SimpleDashboardContent({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Legal-MU</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.firstName} {user.lastName}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to your Dashboard!
          </h2>
          <p className="text-gray-600 mb-6">
            You are successfully logged in. This is your personal dashboard where you can view your profile and manage your account.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                User Information
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">Role:</span>{' '}
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                    {user.role === 'VISITOR' ? 'LAWYER' : user.role}
                  </span>
                </p>
                {user.dateOfBirth && (
                  <p>
                    <span className="font-medium">Date of Birth:</span>{' '}
                    {formatDate(user.dateOfBirth)}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Professional Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Category:</span> {user.category || '—'}
                </p>
                <p>
                  <span className="font-medium">Area of Law:</span> {user.areaOfLaw || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Admin Dashboard for Admins (Lawyers List)
async function lawyersDashboardContent(user: User) {
  const { lawyers, total } = await fetchLawyers();

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-white">Legal-MU</h1>
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm font-medium text-white px-4 py-2 bg-white/10 rounded-lg whitespace-nowrap">Admin Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300">
                {user.firstName} {user.lastName}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Registered Lawyers</h2>
            <p className="text-slate-500">Manage all registered legal professionals.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <span className="text-sm text-slate-500">Total: </span>
            <span className="font-bold text-slate-900">{total}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Area of Law</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {lawyers.map((lawyer) => (
                  <tr key={lawyer.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {lawyer.firstName} {lawyer.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lawyer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lawyer.category || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lawyer.areaOfLaw || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{formatDate(lawyer.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main logic to determine which dashboard to show
async function DashboardRouter() {
  const user = await getServerUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role === 'ADMIN') {
    return lawyersDashboardContent(user);
  }

  return <SimpleDashboardContent user={user} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardRouter />
    </Suspense>
  );
}