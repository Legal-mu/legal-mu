'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Legal-MU</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
                <button
                  onClick={logout}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Logout
                </button>
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
              You are successfully logged in. This is a protected page that only
              authenticated users can access.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  User Information
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Name:</span> {user?.firstName}{' '}
                    {user?.lastName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p>
                    <span className="font-medium">Role:</span>{' '}
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      {user?.role}
                    </span>
                  </p>
                  {user?.dateOfBirth && (
                    <p>
                      <span className="font-medium">Date of Birth:</span>{' '}
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                    View Profile
                  </button>
                  <button className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Settings
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Protected Route
                </h3>
                <p className="text-sm text-gray-600">
                  This page is protected and only accessible to authenticated users.
                  The authentication is handled by JWT tokens stored securely.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

