/**
 * Admin routes - Admin-only endpoints
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../types/auth';
import prisma from '../db/prisma';

const router = Router();

/**
 * @route   GET /api/admin/lawyers
 * @desc    Get all registered lawyers (VISITOR users)
 * @access  Private (Admin only)
 */
router.get(
    '/lawyers',
    authenticate,
    authorize(UserRole.ADMIN),
    async (req, res) => {
        try {
            const lawyers = await prisma.user.findMany({
                where: { role: 'VISITOR' },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    dateOfBirth: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { createdAt: 'desc' },
            });

            res.json({
                success: true,
                data: {
                    lawyers,
                    total: lawyers.length,
                },
            });
        } catch (error) {
            console.error('Error fetching lawyers:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching lawyers',
            });
        }
    }
);

export default router;
