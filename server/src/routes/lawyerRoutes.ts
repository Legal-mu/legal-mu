import { Router } from 'express';
import { UserRole, UserStatus } from '../types/auth';
import prisma from '../db/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';
import * as profileController from '../controllers/lawyerProfileController';

const router = Router();

/**
 * @route   GET /api/lawyers
 * @desc    Get all approved lawyers with pagination, search, and filters
 * @access  Public
 */
router.get(
    '/',
    async (req, res) => {
        try {
            const {
                page = '1',
                limit = '6',
                search = '',
                location = '',
                practiceArea = '',
                experienceYears = '',
                minRating = '',
                sortBy = 'createdAt'
            } = req.query;

            const pageNum = parseInt(page as string, 10);
            const limitNum = parseInt(limit as string, 10);
            const skip = (pageNum - 1) * limitNum;

            // Build where clause for filtering
            const where: any = {
                role: UserRole.LAWYER,
                status: UserStatus.APPROVED,
                lawyerProfile: {
                    status: 'APPROVED' // Only show lawyers with approved profiles
                }
            };

            // Search filter (name or practice areas)
            if (search) {
                where.OR = [
                    {
                        firstName: {
                            contains: search as string,
                            mode: 'insensitive'
                        }
                    },
                    {
                        lastName: {
                            contains: search as string,
                            mode: 'insensitive'
                        }
                    },
                    {
                        lawyerProfile: {
                            practiceAreas: {
                                hasSome: [(search as string)]
                            }
                        }
                    }
                ];
            }

            // Location filter
            if (location) {
                where.lawyerProfile = {
                    ...where.lawyerProfile,
                    city: {
                        contains: location as string,
                        mode: 'insensitive'
                    }
                };
            }

            // Practice area filter
            if (practiceArea) {
                where.lawyerProfile = {
                    ...where.lawyerProfile,
                    practiceAreas: {
                        has: practiceArea as string
                    }
                };
            }

            // Experience filter
            if (experienceYears) {
                where.lawyerProfile = {
                    ...where.lawyerProfile,
                    experienceYears: {
                        gte: parseInt(experienceYears as string, 10)
                    }
                };
            }

            // Get total count for pagination
            const total = await prisma.user.count({ where });

            // Fetch lawyers with full profile data
            const lawyers = await prisma.user.findMany({
                where,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true,
                    createdAt: true,
                    lawyerProfile: {
                        select: {
                            id: true,
                            fullLegalName: true,
                            title: true,
                            firmName: true,
                            city: true,
                            address: true,
                            phoneNumber: true,
                            practiceAreas: true,
                            experienceYears: true,
                            languages: true,
                            biography: true,
                            extendedBiography: true,
                            headshotUrl: true,
                            admissionYear: true,
                            workExperience: true,
                            websiteUrl: true,
                            linkedinUrl: true,
                            twitterUrl: true,
                        }
                    }
                },
                orderBy: sortBy === 'experience'
                    ? { lawyerProfile: { experienceYears: 'desc' } }
                    : { createdAt: 'desc' },
                skip,
                take: limitNum,
            });

            res.json({
                success: true,
                data: {
                    lawyers,
                    pagination: {
                        total,
                        page: pageNum,
                        limit: limitNum,
                        totalPages: Math.ceil(total / limitNum)
                    }
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
router.patch('/profile/practice-details', authenticate, authorize(UserRole.LAWYER), upload.single('cv'), profileController.updatePracticeDetails);
router.patch('/profile/biography', authenticate, authorize(UserRole.LAWYER), upload.single('headshot'), profileController.updateBiography);
router.patch('/profile/social-media', authenticate, authorize(UserRole.LAWYER), profileController.updateSocialMedia);
router.patch('/profile/case-stories', authenticate, authorize(UserRole.LAWYER), profileController.updateCaseStories);
router.patch('/profile/verification-tools', authenticate, authorize(UserRole.LAWYER), upload.array('verification', 5), profileController.updateVerificationTools);
router.post('/profile/submit-for-review', authenticate, authorize(UserRole.LAWYER), profileController.submitForReview);

/**
 * @route   GET /api/lawyers/:id
 * @desc    Get a single lawyer's profile by ID (public view)
 * @access  Public
 * @important This route MUST be at the end to avoid conflicts with /profile routes
 */
router.get(
    '/:id',
    async (req, res) => {
        try {
            const { id } = req.params;

            const lawyer = await prisma.user.findFirst({
                where: {
                    id,
                    role: UserRole.LAWYER,
                    status: UserStatus.APPROVED,
                    lawyerProfile: {
                        status: 'APPROVED'
                    }
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true,
                    createdAt: true,
                    lawyerProfile: {
                        select: {
                            id: true,
                            fullLegalName: true,
                            title: true,
                            registrationNumber: true,
                            firmName: true,
                            legalCategory: true,
                            address: true,
                            city: true,
                            postal_code: true,
                            country: true,
                            phoneNumber: true,
                            practiceAreas: true,
                            admissionYear: true,
                            experienceYears: true,
                            languages: true,
                            workExperience: true,
                            cvUrl: true,
                            biography: true,
                            extendedBiography: true,
                            headshotUrl: true,
                            websiteUrl: true,
                            linkedinUrl: true,
                            twitterUrl: true,
                            youtubeUrl: true,
                            showGoogleReviews: true,
                            googleBusinessProfileUrl: true,
                            clientTestimonials: true,
                            featuredSuccessStories: true,
                            verifiedBadges: true,
                        }
                    }
                }
            });

            if (!lawyer || !lawyer.lawyerProfile) {
                return res.status(404).json({
                    success: false,
                    message: 'Lawyer not found or profile not approved',
                });
            }

            res.json({
                success: true,
                data: lawyer,
            });
        } catch (error) {
            console.error('Error fetching lawyer profile:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching lawyer profile',
            });
        }
    }
);

export default router;
