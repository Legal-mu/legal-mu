/**
 * Lawyer related routes
 */

import { Router } from 'express';
import { UserRole, UserStatus } from '../types/auth';
import prisma from '../db/prisma';

const router = Router();

/**
 * @route   GET /api/lawyers
 * @desc    Get all approved lawyers (accessible to all authenticated users)
 * @access  Public (Authenticated)
 */
router.get(
    '/',
    async (req, res) => {
        try {
            const lawyers = await prisma.user.findMany({
                where: {
                    role: UserRole.LAWYER,
                    status: UserStatus.APPROVED
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatar: true,
                    createdAt: true,
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
