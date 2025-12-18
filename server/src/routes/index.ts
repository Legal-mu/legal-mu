/**
 * Example protected route using authentication and authorization
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types/auth';

const router = Router();

/**
 * @route   GET /api/protected
 * @desc    Get current authenticated user
 * @access  Private
 */
router.get('/protected', authenticate, async (req, res) => {
  try {
    const prisma = (await import('../db/prisma')).default;
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        dateOfBirth: true,
        areaOfLaw: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
    });
  }
});

/**
 * @route   GET /api/admin-only
 * @desc    Example admin-only route
 * @access  Private (Admin only)
 */
router.get('/admin-only', authenticate, authorize(UserRole.ADMIN), (req, res) => {
  res.json({
    success: true,
    message: 'This is an admin-only route',
    user: req.user,
  });
});

export default router;

