# Legal-MU Frontend

Next.js 16 frontend application with TypeScript and Tailwind CSS.

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
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── api-test/        # API test page
│   ├── components/         # React components
│   ├── lib/                 # Utility functions
│   │   └── api.ts           # API client
│   └── types/               # TypeScript type definitions
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

## 🔗 API Integration

The frontend communicates with the backend API through the `src/lib/api.ts` utility.

**Example usage:**

```typescript
import { api } from '@/lib/api';

// Health check
const health = await api.healthCheck();

// Get server status
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

---

## 🧪 Testing API Connection

1. Make sure your backend server is running on `http://localhost:5001`
2. Visit `http://localhost:3000/api-test` to test the connection
3. You should see the server status and health check information

---

## 📚 Next Steps

1. **Create Components:** Add reusable components in `src/components/`
2. **Add Pages:** Create new pages in `src/app/`
3. **API Integration:** Extend `src/lib/api.ts` with more endpoints
4. **Authentication:** Set up JWT authentication
5. **State Management:** Add state management if needed (Zustand, Redux, etc.)

---

## 🚨 Important Notes

- ⚠️ **Never commit `.env.local` file** - It contains sensitive information
- ⚠️ **Use `NEXT_PUBLIC_` prefix** for environment variables that should be exposed to the browser
- ⚠️ **API calls from client components** require `'use client'` directive

---

## 💡 Best Practices

1. **Use Server Components by default** - Only use client components when needed
2. **Type everything** - Leverage TypeScript for type safety
3. **Organize by feature** - Group related files together
4. **Reuse components** - Create reusable components in `src/components/`
5. **Handle errors gracefully** - Always handle API errors properly

---

## 🎓 Learning Resources

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **React Docs:** [react.dev](https://react.dev)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs)

---

## 🎉 You're All Set!

Your Next.js frontend is ready for development. Start building your legal management system!

Happy coding! 🚀
