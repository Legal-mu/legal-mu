'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import type { HealthCheckResponse, ServerStatusResponse } from '@/types';

export default function ApiTestPage() {
  const [healthStatus, setHealthStatus] = useState<HealthCheckResponse | null>(null);
  const [serverStatus, setServerStatus] = useState<ServerStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [health, status] = await Promise.all([
          api.healthCheck(),
          api.getStatus(),
        ]);
        setHealthStatus(health);
        setServerStatus(status);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to API');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          API Connection Test
        </h1>

        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-400 mb-2">
              Connection Error
            </h2>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <p className="text-sm text-red-500 dark:text-red-400 mt-2">
              Make sure your backend server is running on http://localhost:5001
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Server Status
              </h2>
              {serverStatus && (
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Message:</span> {serverStatus.message}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Status:</span>{' '}
                    <span className="text-green-600 dark:text-green-400">
                      {serverStatus.status}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Health Check
              </h2>
              {healthStatus && (
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={
                        healthStatus.status === 'healthy'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }
                    >
                      {healthStatus.status}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Database:</span>{' '}
                    <span
                      className={
                        healthStatus.database === 'connected'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }
                    >
                      {healthStatus.database}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Timestamp:</span>{' '}
                    {new Date(healthStatus.timestamp).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

