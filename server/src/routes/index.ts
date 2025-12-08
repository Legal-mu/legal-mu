/**
 * Example protected route using authentication and authorization
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types/auth';

const router = Router();

/**
 * @route   GET /api/protected
 * @desc    Example protected route (requires authentication)
 * @access  Private
 */
router.get('/protected', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'This is a protected route',
    user: req.user,
  });
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

