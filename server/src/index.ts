import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import prisma from './db/prisma';
import authRoutes from './routes/authRoutes';
import googleAuthRoutes from './routes/googleAuthRoutes';
import protectedRoutes from './routes/index';
import adminRoutes from './routes/adminRoutes';
import lawyerRoutes from './routes/lawyerRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // Allow cookies
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Legal-MU API Server is running!',
    status: 'ok'
  });
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API Routes
app.use('/api/auth/google', googleAuthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Test database connection first
    await testDatabaseConnection();

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
startServer();

