import { Router } from 'express';
import { UserRole, UserStatus } from '../types/auth';
import prisma from '../db/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';
import * as profileController from '../controllers/lawyerProfileController';

const router = Router();

/**
 * @route   GET /api/lawyers
 * @desc    Get all approved lawyers
 * @access  Public
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

/**
 * Profile Completion Routes
 */
router.get('/profile', authenticate, authorize(UserRole.LAWYER), profileController.getProfile);
router.get('/profile/status', authenticate, authorize(UserRole.LAWYER), profileController.getProfileStatus);
router.patch('/profile/professional-identity', authenticate, authorize(UserRole.LAWYER), profileController.updateProfessionalIdentity);
router.patch('/profile/contact-information', authenticate, authorize(UserRole.LAWYER), profileController.updateContactInformation);
router.patch('/profile/practice-details', authenticate, authorize(UserRole.LAWYER), profileController.updatePracticeDetails);
router.patch('/profile/biography', authenticate, authorize(UserRole.LAWYER), upload.single('headshot'), profileController.updateBiography);
router.patch('/profile/social-media', authenticate, authorize(UserRole.LAWYER), profileController.updateSocialMedia);
router.post('/profile/submit-for-review', authenticate, authorize(UserRole.LAWYER), profileController.submitForReview);

export default router;
