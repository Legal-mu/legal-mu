import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import { UserRole, LawyerProfileStatus, ProfessionalTitle, LegalCategory } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

// Extended request type for authenticated users
interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: UserRole;
    };
}

/**
 * Calculate completion percentage and identify missing fields
 */
const calculateCompletion = (profile: any) => {
    const requiredFields = [
        // Step 1
        'fullLegalName', 'title', 'registrationNumber', 'firmName', 'legalCategory',
        // Step 2
        'address', 'city', 'postal_code', 'country', 'phoneNumber',
        // Step 3
        'practiceAreas', 'admissionYear', 'experienceYears', 'languages', 'workExperience', 'cvUrl',
        // Step 4
        'headshotUrl', 'biography', 'extendedBiography'
    ];

    let completedFields = 0;
    const missingFields = [];

    for (const field of requiredFields) {
        const value = profile[field];
        if (Array.isArray(value)) {
            if (value.length > 0) completedFields++;
            else missingFields.push(field);
        } else if (value !== null && value !== undefined && value !== '') {
            completedFields++;
        } else {
            missingFields.push(field);
        }
    }

    const percentage = Math.round((completedFields / requiredFields.length) * 100);

    // Track completed steps
    const completedSteps = [];
    if (profile.fullLegalName && profile.title && profile.registrationNumber && profile.firmName && profile.legalCategory) {
        completedSteps.push('professional-identity');
    }
    if (profile.address && profile.city && profile.postal_code && profile.country && profile.phoneNumber) {
        completedSteps.push('contact-information');
    }
    if (profile.practiceAreas?.length > 0 && profile.admissionYear && profile.experienceYears !== null && profile.languages?.length > 0 && profile.workExperience && profile.cvUrl) {
        completedSteps.push('practice-details');
    }
    if (profile.headshotUrl && profile.biography && profile.extendedBiography) {
        completedSteps.push('biography');
    }
    if (profile.websiteUrl || profile.linkedinUrl || profile.twitterUrl || profile.youtubeUrl || profile.googleBusinessProfileUrl) {
        completedSteps.push('social-media');
    }
    if (profile.clientTestimonials || profile.featuredSuccessStories) {
        completedSteps.push('case-stories');
    }
    if (profile.clientUploadNotificationEmail) {
        completedSteps.push('verification-tools');
    }

    return {
        percentage,
        missingFields,
        completedSteps
    };
};

/**
 * @desc Get current profile details
 */
export const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) throw new AppError('Unauthorized', 401);

        const profile = await prisma.lawyerProfile.findUnique({
            where: { userId }
        });

        if (!profile) throw new AppError('Profile not found', 404);

        res.json({
            success: true,
            data: profile
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Get current profile status
 */
export const getProfileStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) throw new AppError('Unauthorized', 401);

        const profile = await prisma.lawyerProfile.findUnique({
            where: { userId }
        });

        if (!profile) throw new AppError('Profile not found', 404);

        const { percentage, missingFields, completedSteps } = calculateCompletion(profile);

        res.json({
            success: true,
            data: {
                status: profile.status,
                completionPercentage: percentage,
                completedSteps,
                missingFields
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Step 1: Professional Identity
 */
export const updateProfessionalIdentity = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const { fullLegalName, title, registrationNumber, firmName, legalCategory } = req.body;

        if (!fullLegalName || !title || !registrationNumber || !legalCategory) {
            throw new AppError('All required Step 1 fields must be filled', 400);
        }

        // Check bar registration unique
        const existing = await prisma.lawyerProfile.findFirst({
            where: {
                registrationNumber,
                NOT: { userId }
            }
        });

        if (existing) throw new AppError('Bar Registration Number already in use', 400);

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                fullLegalName,
                title: title as ProfessionalTitle,
                registrationNumber,
                firmName,
                legalCategory: legalCategory as any // Prisma enum
            }
        });

        const { percentage } = calculateCompletion(profile);
        await prisma.lawyerProfile.update({
            where: { userId },
            data: { completionPercentage: percentage }
        });

        res.json({
            success: true,
            message: 'Professional identity updated successfully',
            data: { status: profile.status, completionPercentage: percentage }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Step 2: Contact Information
 */
export const updateContactInformation = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const { address, city, postal_code, country, phoneNumber } = req.body;

        if (!address || !city || !country || !phoneNumber) {
            throw new AppError('All required Step 2 fields must be filled', 400);
        }

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                address,
                city,
                postal_code,
                country,
                phoneNumber
            }
        });

        const { percentage } = calculateCompletion(profile);
        await prisma.lawyerProfile.update({
            where: { userId },
            data: { completionPercentage: percentage }
        });

        res.json({
            success: true,
            message: 'Contact information updated successfully',
            data: { status: profile.status, completionPercentage: percentage }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Step 3: Practice Details
 */
export const updatePracticeDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const { practiceAreas, admissionYear, experienceYears, languages, workExperience } = req.body;
        const file = req.file;

        // admissionYear, experienceYears, practiceAreas, languages are expected as JSON strings if coming from form-data
        const parsedAdmissionYear = typeof admissionYear === 'string' ? parseInt(admissionYear) : admissionYear;
        const parsedExperienceYears = typeof experienceYears === 'string' ? parseInt(experienceYears) : experienceYears;

        let parsedWorkExperience = workExperience;
        if (typeof workExperience === 'string') {
            try {
                parsedWorkExperience = JSON.parse(workExperience);
            } catch (e) {
                throw new AppError('Invalid work experience format', 400);
            }
        }

        let parsedPracticeAreas = practiceAreas;
        if (typeof practiceAreas === 'string') {
            try {
                parsedPracticeAreas = JSON.parse(practiceAreas);
            } catch (e) {
                throw new AppError('Invalid practice areas format', 400);
            }
        }

        let parsedLanguages = languages;
        if (typeof languages === 'string') {
            try {
                parsedLanguages = JSON.parse(languages);
            } catch (e) {
                throw new AppError('Invalid languages format', 400);
            }
        }

        if (!parsedPracticeAreas || !Array.isArray(parsedPracticeAreas) || parsedPracticeAreas.length === 0 ||
            !parsedAdmissionYear || isNaN(parsedAdmissionYear) ||
            parsedExperienceYears === undefined || isNaN(parsedExperienceYears) ||
            !parsedLanguages || !Array.isArray(parsedLanguages) || parsedLanguages.length === 0 ||
            !parsedWorkExperience) {
            throw new AppError('All Step 3 fields are required and must be valid', 400);
        }

        if (parsedAdmissionYear < 1950 || parsedAdmissionYear > new Date().getFullYear()) {
            throw new AppError('Invalid admission year', 400);
        }

        let cvUrl = undefined;
        if (file) {
            cvUrl = `/uploads/cvs/${file.filename}`;
        }

        const currentProfile = await prisma.lawyerProfile.findUnique({ where: { userId } });
        if (!cvUrl && !currentProfile?.cvUrl) {
            throw new AppError('CV / Firm Brochure upload is required', 400);
        }

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                practiceAreas: parsedPracticeAreas,
                admissionYear: parsedAdmissionYear,
                experienceYears: parsedExperienceYears,
                languages: parsedLanguages,
                workExperience: parsedWorkExperience,
                ...(cvUrl && { cvUrl })
            }
        });

        const { percentage } = calculateCompletion(profile);
        await prisma.lawyerProfile.update({
            where: { userId },
            data: { completionPercentage: percentage }
        });

        res.json({
            success: true,
            message: 'Practice details updated successfully',
            data: { status: profile.status, completionPercentage: percentage }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Step 4: Professional Biography (Headshot & Bio)
 */
export const updateBiography = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const { biography, extendedBiography } = req.body;
        const file = req.file;

        if (!biography || !extendedBiography) {
            throw new AppError('Biography and Extended Biography are required', 400);
        }

        // Validation for bio word count
        const bioWordCount = biography.trim().split(/\s+/).length;
        if (bioWordCount > 100) throw new AppError('Short Biography must not exceed 100 words', 400);

        const extBioWordCount = extendedBiography.trim().split(/\s+/).length;
        if (extBioWordCount > 300) throw new AppError('Extended Biography must not exceed 300 words', 400);

        let headshotUrl = undefined;
        if (file) {
            headshotUrl = `/uploads/headshots/${file.filename}`;
        }

        const currentProfile = await prisma.lawyerProfile.findUnique({ where: { userId } });
        if (!headshotUrl && !currentProfile?.headshotUrl) {
            throw new AppError('Headshot image is required', 400);
        }

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                biography,
                extendedBiography,
                ...(headshotUrl && { headshotUrl })
            }
        });

        const { percentage } = calculateCompletion(profile);
        await prisma.lawyerProfile.update({
            where: { userId },
            data: { completionPercentage: percentage }
        });

        res.json({
            success: true,
            message: 'Biography and headshot updated successfully',
            data: { status: profile.status, completionPercentage: percentage }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Step 5: Social Media
 */
export const updateSocialMedia = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const { websiteUrl, linkedinUrl, twitterUrl, youtubeUrl, showGoogleReviews, googleBusinessProfileUrl } = req.body;

        // Optional fields, so no required validation except format if provided
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

        if (websiteUrl && !urlRegex.test(websiteUrl)) throw new AppError('Invalid Website URL', 400);
        if (linkedinUrl && !urlRegex.test(linkedinUrl)) throw new AppError('Invalid LinkedIn URL', 400);
        if (twitterUrl && !urlRegex.test(twitterUrl)) throw new AppError('Invalid Twitter URL', 400);
        if (youtubeUrl && !urlRegex.test(youtubeUrl)) throw new AppError('Invalid YouTube URL', 400);
        if (googleBusinessProfileUrl && !urlRegex.test(googleBusinessProfileUrl)) throw new AppError('Invalid Google Business Profile URL', 400);

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                websiteUrl,
                linkedinUrl,
                twitterUrl,
                youtubeUrl,
                showGoogleReviews: showGoogleReviews === true || showGoogleReviews === 'true',
                googleBusinessProfileUrl
            }
        });

        const { percentage } = calculateCompletion(profile);
        await prisma.lawyerProfile.update({
            where: { userId },
            data: { completionPercentage: percentage }
        });

        res.json({
            success: true,
            message: 'Social media and reviews settings updated successfully',
            data: { status: profile.status, completionPercentage: percentage }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Step 6: Client Testimonials & Success Stories
 */
export const updateCaseStories = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const { clientTestimonials, featuredSuccessStories } = req.body;

        let parsedTestimonials = clientTestimonials;
        if (typeof clientTestimonials === 'string') {
            try {
                parsedTestimonials = JSON.parse(clientTestimonials);
            } catch (e) {
                throw new AppError('Invalid testimonials format', 400);
            }
        }

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                clientTestimonials: parsedTestimonials,
                featuredSuccessStories
            }
        });

        const { percentage } = calculateCompletion(profile);
        await prisma.lawyerProfile.update({
            where: { userId },
            data: { completionPercentage: percentage }
        });

        res.json({
            success: true,
            message: 'Case stories and testimonials updated successfully',
            data: { status: profile.status, completionPercentage: percentage }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Step 7: Verification & Tools
 */
export const updateVerificationTools = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const { clientDataUploadEnabled, clientUploadNotificationEmail, authorizedFileTypes, existingBadges } = req.body;
        const files = req.files as Express.Multer.File[];

        let badgeUrls: string[] = [];
        if (files && files.length > 0) {
            badgeUrls = files.map(file => `/uploads/verification/${file.filename}`);
        }

        let badgesToKeep: string[] = [];
        if (existingBadges) {
            try {
                badgesToKeep = typeof existingBadges === 'string' ? JSON.parse(existingBadges) : existingBadges;
            } catch (e) {
                // If it's not JSON, maybe it's a single string or already an array
                badgesToKeep = Array.isArray(existingBadges) ? existingBadges : [existingBadges];
            }
        } else {
            // Default to current badges if existingBadges not provided in request
            const currentProfile = await prisma.lawyerProfile.findUnique({ where: { userId } });
            badgesToKeep = currentProfile?.verifiedBadges || [];
        }

        const updatedBadges = [...badgesToKeep, ...badgeUrls];

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                clientDataUploadEnabled: clientDataUploadEnabled === true || clientDataUploadEnabled === 'true',
                clientUploadNotificationEmail,
                authorizedFileTypes: (typeof authorizedFileTypes === 'string' ? JSON.parse(authorizedFileTypes) : authorizedFileTypes),
                verifiedBadges: updatedBadges
            }
        });

        const { percentage } = calculateCompletion(profile);
        await prisma.lawyerProfile.update({
            where: { userId },
            data: { completionPercentage: percentage }
        });

        res.json({
            success: true,
            message: 'Verification and tools updated successfully',
            data: { status: profile.status, completionPercentage: percentage }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Submit for review
 */
export const submitForReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;

        const profile = await prisma.lawyerProfile.findUnique({ where: { userId } });
        if (!profile) throw new AppError('Profile not found', 404);

        if (profile.status !== LawyerProfileStatus.INCOMPLETE && profile.status !== LawyerProfileStatus.REJECTED) {
            throw new AppError('Profile is already submitted or approved', 400);
        }

        const { percentage, missingFields } = calculateCompletion(profile);

        if (percentage < 100) {
            throw new AppError(`Profile is not complete. Missing fields: ${missingFields.join(', ')}`, 400);
        }

        await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                status: LawyerProfileStatus.PENDING_REVIEW,
                submittedAt: new Date()
            }
        });

        res.json({
            success: true,
            message: 'Profile submitted for review successfully',
            data: { status: LawyerProfileStatus.PENDING_REVIEW }
        });
    } catch (error) {
        next(error);
    }
};
