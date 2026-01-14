/**
 * Admin routes - Admin-only endpoints
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../generated/prisma';
import {
    getAllLawyers,
    getAllClients,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/adminController';

const router = Router();

/**
 * @route   GET /api/admin/lawyers
 * @desc    Get all lawyers
 * @access  Private (Admin only)
 */
router.get('/lawyers', authenticate, authorize(UserRole.ADMIN), getAllLawyers);

/**
 * @route   GET /api/admin/clients
 * @desc    Get all clients
 * @access  Private (Admin only)
 */
router.get('/clients', authenticate, authorize(UserRole.ADMIN), getAllClients);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin only)
 */
router.get('/users/:id', authenticate, authorize(UserRole.ADMIN), getUserById);

/**
 * @route   PATCH /api/admin/users/:id
 * @desc    Update user
 * @access  Private (Admin only)
 */
router.patch('/users/:id', authenticate, authorize(UserRole.ADMIN), updateUser);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user
 * @access  Private (Admin only)
 */
router.delete('/users/:id', authenticate, authorize(UserRole.ADMIN), deleteUser);

export default router;