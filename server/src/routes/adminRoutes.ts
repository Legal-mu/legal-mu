/**
 * Admin routes - Admin-only endpoints
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '@prisma/client';
import {
    getAllLawyers,
    getAllClients,
    getUserById,
    updateUser,
    deleteUser,
    changeAdminPassword,
    getPendingLawyers,
    approveLawyer,
    rejectLawyer
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

/**
 * @route   GET /api/admin/lawyers/pending-review
 * @desc    Get all lawyers pending review
 * @access  Private (Admin only)
 */
router.get('/lawyers/pending-review', authenticate, authorize(UserRole.ADMIN), getPendingLawyers);

/**
 * @route   PATCH /api/admin/lawyers/:id/approve
 * @desc    Approve lawyer profile
 * @access  Private (Admin only)
 */
router.patch('/lawyers/:id/approve', authenticate, authorize(UserRole.ADMIN), approveLawyer);

/**
 * @route   PATCH /api/admin/lawyers/:id/reject
 * @desc    Reject lawyer profile
 * @access  Private (Admin only)
 */
router.patch('/lawyers/:id/reject', authenticate, authorize(UserRole.ADMIN), rejectLawyer);

/**
 * @route   PUT /api/admin/change-password
 * @desc    Change admin password
 * @access  Private (Admin only)
 */
router.put('/change-password', authenticate, authorize(UserRole.ADMIN), changeAdminPassword);

export default router;