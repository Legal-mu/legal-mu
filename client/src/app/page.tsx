import Link from 'next/link';
import { getServerUser } from '../lib/auth';
import { redirect } from 'next/navigation';

// Mark this page as dynamic (uses cookies)
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Server Component - check auth on server
  const user = await getServerUser();

  // Redirect to dashboard if authenticated
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-16">
      <main className="flex flex-col items-center justify-center text-center max-w-4xl w-full">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Legal-MU
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Legal Matters Management System
          </p>
          <p className="text-sm text-gray-500">
            Next.js 16 + TypeScript + Tailwind CSS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Frontend
            </h2>
            <p className="text-gray-600 text-sm">
              Next.js 16 with App Router
            </p>
            <p className="text-gray-600 text-sm">
              TypeScript + Tailwind CSS
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Backend
            </h2>
            <p className="text-gray-600 text-sm">
              Express.js + Node.js
            </p>
            <p className="text-gray-600 text-sm">
              PostgreSQL + Prisma
            </p>
          </div>
        </div>

        <div className="mt-8 space-x-4">
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-block px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
