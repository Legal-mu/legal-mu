# Legal-MU

Legal Matters Management System - Full-stack application with Next.js frontend and Express.js backend.

## 🏗️ Project Structure

```
legal-mu/
├── client/          # Next.js 16 frontend (TypeScript + Tailwind CSS)
├── server/          # Express.js backend (TypeScript + PostgreSQL + Prisma)
└── README.md        # This file
```

## 🚀 Quick Start

### Backend Setup

```bash
cd server
npm install
# Create .env file (see server/README.md)
npm run dev
```

Backend runs on `http://localhost:5001`

### Frontend Setup

```bash
cd client
npm install
# Create .env.local file (see client/README.md)
npm run dev
```

Frontend runs on `http://localhost:3000`

## 📚 Documentation

- **Backend:** See [server/README.md](./server/README.md)
- **Frontend:** See [client/README.md](./client/README.md)

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- React 19

### Backend
- Express.js
- Node.js 22
- TypeScript
- PostgreSQL
- Prisma 7

## 📝 Development

1. Start backend: `cd server && npm run dev`
2. Start frontend: `cd client && npm run dev`
3. Visit `http://localhost:3000`

## 📦 Environment Variables

### Backend (server/.env)
```env
PORT=5001
NODE_ENV=development
DATABASE_URL="postgresql://username@localhost:5432/legal_mu?schema=public"
```

### Frontend (client/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## 🎯 Features (Planned)

- [ ] Landing page
- [ ] JWT Authentication
- [ ] CRUD operations
- [ ] AI integration (RAG, LangChain)

## 📄 License

[Your License Here]

---

Built with ❤️ for legal matters management

