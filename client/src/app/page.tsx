import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Legal-MU
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Legal Matters Management System
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Next.js 16 + TypeScript + Tailwind CSS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl w-full">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Frontend
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Next.js 16 with App Router
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              TypeScript + Tailwind CSS
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Backend
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Express.js + Node.js
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              PostgreSQL + Prisma
            </p>
          </div>
        </div>

        <div className="mt-8 space-x-4">
          <Link
            href="/api-test"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Test API Connection
          </Link>
          <a
            href="http://localhost:5001/health"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Backend Health
          </a>
        </div>
      </main>
    </div>
  );
}
