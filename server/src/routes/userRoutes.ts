/**
 * User routes
 */

import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getProfile, updateProfile } from '../controllers/userController';

const router = Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticate, getProfile);

/**
 * @route   PATCH /api/users/profile
 * @desc    Update current user profile
 * @access  Private
 */
router.patch('/profile', authenticate, updateProfile);

export default router;
