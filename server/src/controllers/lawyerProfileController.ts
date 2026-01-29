import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import { UserRole, LawyerProfileStatus, ProfessionalTitle } from '../generated/prisma';
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
        'fullLegalName', 'title', 'registrationNumber', 'firmName',
        // Step 2
        'address', 'city', 'postal_code', 'country', 'phoneNumber',
        // Step 3
        'practiceAreas', 'admissionYear', 'experienceYears', 'languages',
        // Step 4
        'headshotUrl', 'biography'
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

    // Track completed steps (rough logic)
    const completedSteps = [];
    if (profile.fullLegalName && profile.title && profile.registrationNumber && profile.firmName) completedSteps.push('professional-identity');
    if (profile.address && profile.city && profile.postal_code && profile.country && profile.phoneNumber) completedSteps.push('contact-information');
    if (profile.practiceAreas?.length > 0 && profile.admissionYear && profile.experienceYears !== null && profile.languages?.length > 0) completedSteps.push('practice-details');
    if (profile.headshotUrl && profile.biography) completedSteps.push('biography');

    // Step 5 is optional, but let's say it's "done" if any field is filled or just always "available"
    if (profile.websiteUrl || profile.linkedinUrl || profile.twitterUrl || profile.youtubeUrl) completedSteps.push('social-media');

    return {
        percentage,
        missingFields,
        completedSteps
    };
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
        const { fullLegalName, title, registrationNumber, firmName } = req.body;

        if (!fullLegalName || !title || !registrationNumber || !firmName) {
            throw new AppError('All Step 1 fields are required', 400);
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
                firmName
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

        if (!address || !city || !postal_code || !country || !phoneNumber) {
            throw new AppError('All Step 2 fields are required', 400);
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
        const { practiceAreas, admissionYear, experienceYears, languages } = req.body;

        if (!practiceAreas || practiceAreas.length === 0 || !admissionYear || experienceYears === undefined || !languages || languages.length === 0) {
            throw new AppError('All Step 3 fields are required', 400);
        }

        if (admissionYear < 1950 || admissionYear > new Date().getFullYear()) {
            throw new AppError('Invalid admission year', 400);
        }

        if (experienceYears < 0) throw new AppError('Experience years must be positive', 400);
        if (languages.length > 10) throw new AppError('Max 10 languages allowed', 400);

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                practiceAreas, // Assuming array as per requirement "Areas of Practice (single select)" - wait, if single select, why array? I'll allow array for future-proofing or if one area is selected it's [area].
                admissionYear,
                experienceYears,
                languages
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
        const { biography } = req.body;

        // File upload handled by middleware (e.g. multer)
        // For now I'll assume req.file contains the headshot
        const file = req.file;

        if (!biography) throw new AppError('Biography is required', 400);

        // Validation for bio word count (max 100 words)
        const wordCount = biography.trim().split(/\s+/).length;
        if (wordCount > 100) throw new AppError('Biography must not exceed 100 words', 400);

        let headshotUrl = undefined;
        if (file) {
            // In a real app, upload to S3/Cloudinary.
            // For local development, we'll use the local path.
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
        const { websiteUrl, linkedinUrl, twitterUrl, youtubeUrl } = req.body;

        // Optional fields, so no required validation except format if provided
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

        if (websiteUrl && !urlRegex.test(websiteUrl)) throw new AppError('Invalid Website URL', 400);
        if (linkedinUrl && !urlRegex.test(linkedinUrl)) throw new AppError('Invalid LinkedIn URL', 400);
        if (twitterUrl && !urlRegex.test(twitterUrl)) throw new AppError('Invalid Twitter URL', 400);
        if (youtubeUrl && !urlRegex.test(youtubeUrl)) throw new AppError('Invalid YouTube URL', 400);

        const profile = await prisma.lawyerProfile.update({
            where: { userId },
            data: {
                websiteUrl,
                linkedinUrl,
                twitterUrl,
                youtubeUrl
            }
        });

        const { percentage } = calculateCompletion(profile);
        await prisma.lawyerProfile.update({
            where: { userId },
            data: { completionPercentage: percentage }
        });

        res.json({
            success: true,
            message: 'Social media updated successfully',
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
