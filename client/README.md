# Legal-MU Frontend

Next.js 16 frontend application with TypeScript, Tailwind CSS, Zustand, and TanStack React Query.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.9 or higher
- Backend server running on `http://localhost:5001`

### Installation

```bash
# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the `client/` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001
```

**Note:** The `.env.local` file is gitignored. Use `.env.local.example` as a template.

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── page.tsx         # Home page (public, Server Component)
│   │   ├── actions/         # Server Actions
│   │   │   └── auth.ts      # Auth Server Actions (login, register, logout)
│   │   ├── login/           # Login page (Client Component)
│   │   ├── register/        # Register page (Client Component)
│   │   ├── dashboard/       # Protected dashboard (Server Component)
│   │   └── forgot-password/ # Password reset (Client Component)
│   ├── components/          # React components
│   │   ├── ProtectedRoute.tsx  # Route protection (legacy, middleware handles this)
│   │   ├── Providers.tsx        # React Query provider
│   │   └── LogoutButton.tsx     # Logout button component
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts       # Authentication hooks (for client-side state)
│   │   └── useApi.ts        # React Query hooks for data fetching
│   ├── store/               # Zustand stores
│   │   └── authStore.ts     # Auth state management (user data only)
│   ├── lib/                 # Utility functions
│   │   ├── api.ts           # API client (for React Query)
│   │   ├── api-error.ts     # API error handling utilities
│   │   ├── auth.ts          # Server-side auth utilities
│   │   └── react-query.ts   # React Query config
│   ├── proxy.ts             # Next.js proxy for route protection (edge runtime)
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
│       └── jwt.ts           # JWT utilities (client-side decoding)
├── public/                  # Static assets
├── .env.local               # Environment variables (create this)
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── tailwind.config.ts       # Tailwind CSS configuration
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand (for client state)
- **Server State:** TanStack React Query (for API calls)
- **Authentication:** JWT with httpOnly cookies, Server Actions, and Middleware
- **Linting:** ESLint with Next.js config
- **React:** React 19

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔐 Authentication

The application uses **production-ready authentication** with:
- **httpOnly Cookies** - Secure token storage (not accessible via JavaScript)
- **Server Actions** - Server-side mutations for login/register/logout
- **Next.js Proxy** - Route protection at the edge (formerly middleware)
- **Server Components** - Server-side user verification
- **Zustand** - Client-side user state (UI only, token in cookie)

### Authentication Architecture

1. **Login/Register**: Server Actions handle mutations and set httpOnly cookies
2. **Route Protection**: Next.js Middleware checks cookies before page load
3. **Server Components**: Fetch user data server-side using cookies
4. **Client State**: Zustand stores user data for UI (token never in client)

### Using Authentication (Server Components)

```typescript
import { getServerUser, requireAuth, requireRole } from '@/lib/auth';

// Get user (returns null if not authenticated)
export default async function MyPage() {
  const user = await getServerUser();
  
  if (!user) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome, {user.firstName}!</div>;
}

// Require authentication (redirects to login if not authenticated)
export default async function ProtectedPage() {
  const user = await requireAuth();
  return <div>Welcome, {user.firstName}!</div>;
}

// Require specific role
export default async function AdminPage() {
  const user = await requireRole('ADMIN');
  return <div>Admin dashboard</div>;
}
```

### Using Authentication (Client Components)

```typescript
'use client';

import { loginAction, logoutAction } from '@/app/actions/auth';
import { useAuthStore } from '@/store/authStore';
import { useTransition } from 'react';

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const { user, isAuthenticated } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.success) {
        // Update Zustand store with user data
        if (result.data) {
          useAuthStore.getState().setAuth(result.data);
        }
        // Redirect to dashboard
        router.push('/dashboard');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Protected Routes

Routes are automatically protected by **Next.js Proxy** (formerly middleware). No need for `<ProtectedRoute>` wrapper:

```typescript
// src/proxy.ts handles route protection
// Protected routes: /dashboard, etc.
// Public routes: /login, /register, /, etc.
```

Routes are protected at the edge (edge runtime) before the page even loads!

---

## 🔗 API Integration

The frontend follows **Next.js 16 best practices** with a clear separation:

### Architecture Overview

- **Server Actions** → For mutations (POST, PUT, DELETE, PATCH)
- **TanStack React Query** → For data fetching (GET requests)

### Why This Approach?

1. **Security**: Mutations run on server (can set httpOnly cookies)
2. **Performance**: React Query caches GET requests automatically
3. **UX**: React Query provides loading/error states out of the box
4. **Best Practices**: Aligns with Next.js 16 recommendations

### Using Server Actions (Mutations)

**For Login/Register/Logout:**

```typescript
'use client';

import { loginAction } from '@/app/actions/auth';
import { useTransition } from 'react';

function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.success) {
        // Redirect handled here
        router.push('/dashboard');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

**Server Actions Available:**
- `loginAction(formData)` - Login user
- `registerAction(formData)` - Register user
- `logoutAction()` - Logout user
- `forgotPasswordAction(formData)` - Request password reset

### Using React Query (Data Fetching)

**For GET Requests:**

```typescript
'use client';

import { useHealthCheck, useServerStatus } from '@/hooks/useApi';

function StatusPage() {
  const { data: health, isLoading, error } = useHealthCheck();
  const { data: status } = useServerStatus();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Health: {health?.status}</p>
      <p>Server: {status?.message}</p>
    </div>
  );
}
```

**React Query Hooks Available:**
- `useHealthCheck()` - Health check endpoint
- `useServerStatus()` - Server status
- `useProtectedData()` - Protected route data
- `useInvalidateQueries()` - Query invalidation utilities

### Direct API Calls (Advanced)

For Server Components or special cases:

```typescript
import { api } from '@/lib/api';

// In Server Components
const health = await api.healthCheck();
const status = await api.getStatus();
```

---

## 🎨 Styling

This project uses **Tailwind CSS** for styling. You can customize the theme in `tailwind.config.ts`.

**Dark mode** is supported out of the box.

---

## 🔧 Configuration

### TypeScript

TypeScript is configured with strict mode enabled. Path aliases are set up:
- `@/*` → `./src/*`

### Next.js

- **App Router:** Using the latest App Router (not Pages Router)
- **Server Components:** Default (use `'use client'` for client components)
- **Image Optimization:** Next.js Image component configured

### React Query

- **Stale Time:** 5 minutes (data considered fresh)
- **Garbage Collection Time:** 10 minutes (data kept in cache)
- **Auto Refetch:** On mount and reconnect (window focus disabled)
- **Retry:** 1-2 retries on failure
- **DevTools:** Available in development mode
- **Usage:** Only for GET requests (data fetching)

### Zustand

- **Persistence:** User data (not token) persisted to localStorage for UI
- **Token Storage:** Token stored in httpOnly cookie (not in Zustand)
- **DevTools:** Available via Redux DevTools extension

---

## 🧪 Testing API Connection

1. Make sure your backend server is running on `http://localhost:5001`
2. Visit `http://localhost:3000/api-test` to test the connection
3. You should see the server status and health check information

---

## 📚 Available Pages

- **`/`** - Home page (public, redirects to dashboard if authenticated)
- **`/login`** - Login page (public)
- **`/register`** - Registration page (public)
- **`/dashboard`** - Protected dashboard (requires authentication)
- **`/forgot-password`** - Password reset request (public)
- **`/api-test`** - API connection test page (public)

---

## 🔐 Authentication Flow

1. **Login/Register:** User submits credentials via form
2. **Server Action:** `loginAction` or `registerAction` called (runs on server)
3. **Backend API:** Server Action calls backend API
4. **Cookie Set:** Backend returns token, Server Action sets httpOnly cookie
5. **Response:** Server Action returns success with user data
6. **Client Update:** Zustand store updated with user data
7. **Redirect:** Client-side redirect to dashboard
8. **Proxy:** Next.js Proxy verifies cookie on each request (edge runtime)
9. **Server Component:** Dashboard fetches user data server-side using cookie
10. **Client State:** Zustand stores user data for UI (token never exposed to client)

### Security Features

- ✅ **httpOnly Cookies** - Tokens not accessible via JavaScript (XSS protection)
- ✅ **Secure Flag** - Cookies only sent over HTTPS in production
- ✅ **SameSite: Lax** - CSRF protection
- ✅ **Server-Side Verification** - User data fetched on server, not client
- ✅ **Edge Middleware** - Route protection before page load
- ✅ **No Token in localStorage** - Token only in httpOnly cookie

---

## 📚 Next Steps

1. **Create Components:** Add reusable components in `src/components/`
2. **Add Pages:** Create new pages in `src/app/`
3. **API Integration:** 
   - Create Server Actions for mutations (POST/PUT/DELETE) in `src/app/actions/`
   - Create React Query hooks for data fetching (GET) in `src/hooks/useApi.ts`
4. **State Management:** Add more Zustand stores if needed
5. **CRUD Operations:** 
   - Use **Server Actions** for create/update/delete operations
   - Use **React Query hooks** for fetching data (GET requests)

---

## 🚨 Important Notes

- ⚠️ **Never commit `.env.local` file** - It contains sensitive information
- ⚠️ **Use `NEXT_PUBLIC_` prefix** for environment variables that should be exposed to the browser
- ⚠️ **API calls from client components** require `'use client'` directive
- ✅ **Session persistence** - Auth token stored in httpOnly cookie (production-ready)
- ✅ **Server Actions** - All auth mutations use Server Actions for security

---

## 💡 Best Practices

1. **Use Server Components by default** - Only use client components when needed
2. **Type everything** - Leverage TypeScript for type safety
3. **Server Actions for mutations** - Use Server Actions for POST/PUT/DELETE operations
4. **React Query for queries** - Use React Query hooks for GET requests only
5. **Use Zustand for client state** - Simple and performant state management
6. **Organize by feature** - Group related files together
7. **Reuse components** - Create reusable components in `src/components/`
8. **Handle errors gracefully** - Use `getErrorMessage()` utility for user-friendly errors
9. **Never expose tokens** - Tokens only in httpOnly cookies, never in client code
10. **Use Suspense** - Wrap components using `useSearchParams` in Suspense boundaries

---

## 🎓 Learning Resources

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **React Docs:** [react.dev](https://react.dev)
- **TanStack Query:** [tanstack.com/query](https://tanstack.com/query)
- **Zustand:** [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs)

---

## 🎉 You're All Set!

Your Next.js frontend is ready for development with modern state management and API handling. Start building your legal management system!

Happy coding! 🚀
