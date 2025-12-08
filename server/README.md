# Legal-MU Server

Express.js + TypeScript + PostgreSQL backend server.

## 🚀 Quick Start Guide

This guide will help you set up the backend server on your local machine step by step.

---

## Prerequisites

Before starting, make sure you have:
- **Node.js** (v22.18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (see setup options below)
- **Git** (for cloning the repository)

---

## Step-by-Step Setup

### Step 1: Clone and Navigate to Project

```bash
# If you haven't cloned yet
git clone <repository-url>
cd legal-mu/server
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (Express, TypeScript, Prisma, etc.)

### Step 3: Set Up PostgreSQL Database

**⚠️ Important Decision: Choose Your Database Setup**

You have two options. We **recommend Option A (Local Setup)** for junior developers:

#### ✅ **Option A: Local PostgreSQL (Recommended for Development)**

**Why Local?**
- ✅ Safe to experiment - won't affect other developers
- ✅ Learn how databases work locally
- ✅ No risk of accidentally deleting shared data
- ✅ Free and fast
- ✅ Works offline

**Setup Instructions:**

**For macOS:**
```bash
# Check if PostgreSQL is installed
psql --version

# If not installed, install via Homebrew
brew install postgresql@17

# Start PostgreSQL service
brew services start postgresql@17

# Create your local database
createdb legal_mu

# Verify database was created
psql -l | grep legal_mu
```

**For Windows:**
1. Download PostgreSQL from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Install with default settings (remember the password you set!)
3. Open "SQL Shell (psql)" or "pgAdmin 4"
4. Create database:
   ```sql
   CREATE DATABASE legal_mu;
   ```

**For Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb legal_mu
```

---

### Step 4: Configure Environment Variables

Create a `.env` file in the `server/` directory:

```bash
# In server/ folder
touch .env
```

**For Local Database (Option A):**
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration (Local)
# macOS/Linux: Usually your system username, no password needed
DATABASE_URL="postgresql://YOUR_USERNAME@localhost:5432/legal_mu?schema=public"

# Example for macOS user "john":
# DATABASE_URL="postgresql://john@localhost:5432/legal_mu?schema=public"
```

**How to find your PostgreSQL username:**
```bash
# macOS/Linux
whoami

# Or check PostgreSQL users
psql -d postgres -c "SELECT current_user;"
```

---

### Step 5: Generate Prisma Client

```bash
npm run prisma:generate
```

This creates the database client code that your application uses.

**Expected Output:**
```
✔ Generated Prisma Client (7.1.0) to ./src/generated/prisma in 9ms
```

---

### Step 6: Run Database Migrations

After the team defines database models, run migrations:

```bash
npm run prisma:migrate
```

This creates the database tables based on `prisma/schema.prisma`.

**Note:** If you're the first developer, you might need to create an initial migration:
```bash
npm run prisma:migrate -- --name init
```

---

### Step 7: Start the Development Server

```bash
npm run dev
```

**Expected Output:**
```
✅ Database connected successfully
🚀 Server is running on http://localhost:5001
```

---

## ✅ Verify Everything Works

1. **Check Server:**
   ```bash
   curl http://localhost:5001
   # Should return: {"message":"Legal-MU API Server is running!","status":"ok"}
   ```

2. **Check Database Connection:**
   ```bash
   curl http://localhost:5001/health
   # Should return: {"status":"healthy","database":"connected",...}
   ```

3. **Open in Browser:**
   - Visit: `http://localhost:5001`
   - Visit: `http://localhost:5001/health`

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server (after build) |
| `npm run prisma:generate` | Generate Prisma Client (run after schema changes) |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (visual database editor) |

---

## 🗂️ Project Structure

```
server/
├── src/
│   ├── index.ts              # Main Express server
│   └── db/
│       └── prisma.ts        # Prisma client instance
├── prisma/
│   ├── schema.prisma        # Database schema (define models here)
│   └── migrations/          # Database migration history
├── src/generated/
│   └── prisma/              # Generated Prisma Client (auto-generated)
├── dist/                    # Compiled JavaScript (after build)
├── .env                     # Environment variables (create this)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Troubleshooting

### Problem: "Database connection failed"

**Solutions:**
1. Check if PostgreSQL is running:
   ```bash
   # macOS
   brew services list | grep postgresql
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Verify database exists:
   ```bash
   psql -l | grep legal_mu
   ```

3. Check your `.env` file has correct `DATABASE_URL`

4. Test connection manually:
   ```bash
   psql -d legal_mu
   ```

### Problem: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
```

### Problem: "Prisma Client not generated"

**Solution:**
```bash
npm run prisma:generate
```

### Problem: Port already in use

**Solution:**
1. Change `PORT` in `.env` file to a different port:
   ```env
   PORT=3000
   # Or use: 8000, 3001, etc.
   ```

2. Restart your server:
   ```bash
   # Stop server (Ctrl+C), then:
   npm run dev
   ```

### Problem: Permission denied for database

**Solution:**
```bash
# Grant permissions (macOS/Linux)
psql -d postgres
GRANT ALL PRIVILEGES ON DATABASE legal_mu TO YOUR_USERNAME;
\q
```

---

## 🎓 Learning Resources

- **Prisma Docs:** [prisma.io/docs](https://www.prisma.io/docs)
- **Express.js Docs:** [expressjs.com](https://expressjs.com/)
- **PostgreSQL Tutorial:** [postgresqltutorial.com](https://www.postgresqltutorial.com/)

---

## 🛡️ Best Practices for Junior Developers

1. **Always use local database for development** - Safe experimentation
2. **Never commit `.env` file** - It contains sensitive information
3. **Run `prisma:generate` after schema changes** - Keep client updated
4. **Test locally before pushing** - Make sure everything works
5. **Ask questions** - Don't hesitate to ask for help!

---

## 📝 Database Strategy Recommendation

### For This Project:

**✅ Recommended Approach: Individual Local Databases**

**Why?**
- **Safety First:** Juniors can experiment without risk
- **Learning:** Understanding local development is crucial
- **No Conflicts:** Each developer works independently
- **Cost Effective:** Free, no cloud costs
- **Fast:** Local database is faster than cloud

**When to Use Shared Database:**
- **Staging Environment:** For testing integrations (separate from dev)
- **Production:** Only for live application (never for development)

**Best Practice:**
```
Local Development → Individual Local DBs
Staging/Testing  → Shared Staging DB (separate from production)
Production       → Production DB (never touch from local)
```

---

## 🚨 Important Notes

- ⚠️ **Never use production database for local development**
- ⚠️ **Never commit `.env` file to Git**
- ⚠️ **Always run migrations before starting server**
- ⚠️ **Keep your local database schema in sync with team**

---

## 💡 Need Help?

If you're stuck:
1. Check the Troubleshooting section above
2. Review error messages carefully
3. Ask your team lead or senior developer
4. Check Prisma/Express documentation

---

## 🎉 You're All Set!

Once you see "✅ Database connected successfully" and "🚀 Server is running", you're ready to start developing!

Happy coding! 🚀
