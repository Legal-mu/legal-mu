/**
 * User controller - Profile management for authenticated users
 */

import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import { AppError } from '../middleware/errorHandler';
import { UserRole, ProfessionalTitle } from '@prisma/client';

/**
 * Get current user profile
 */
export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            throw new AppError('Unauthorized', 401);
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { lawyerProfile: true },
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Don't return password
        const { password, ...userWithoutPassword } = user;

        res.json({
            success: true,
            data: userWithoutPassword,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Update current user profile
 */
export async function updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            throw new AppError('Unauthorized', 401);
        }

        const {
            firstName, lastName, dateOfBirth, avatar,
            // Lawyer profile fields
            fullLegalName, professionalTitle, registrationNumber, firmName,
            address, phoneNumber, websiteUrl, practiceAreas,
            experienceYears, languagesSpeak, biography
        } = req.body;

        // Check if user is a lawyer to determine if profile should be updated
        const userWithRole = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        const updateData: any = {
            firstName,
            lastName,
            avatar,
        };

        if (dateOfBirth) {
            updateData.dateOfBirth = new Date(dateOfBirth);
        }

        const updatedUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.update({
                where: { id: userId },
                data: updateData,
                include: { lawyerProfile: true }
            });

            if (user.role === UserRole.LAWYER) {
                await tx.lawyerProfile.upsert({
                    where: { userId: userId },
                    create: {
                        user: { connect: { id: userId } },
                        fullLegalName: fullLegalName || `${user.firstName} ${user.lastName}`,
                        title: professionalTitle as ProfessionalTitle || ProfessionalTitle.BARRISTER,
                        registrationNumber: registrationNumber || 'PENDING',
                        firmName,
                        address: address || 'PENDING',
                        phoneNumber: phoneNumber || 'PENDING',
                        websiteUrl,
                        practiceAreas: practiceAreas || [],
                        experienceYears: experienceYears || 0,
                        languages: languagesSpeak || [],
                        biography: biography || '',
                    },
                    update: {
                        fullLegalName,
                        title: professionalTitle as ProfessionalTitle,
                        registrationNumber,
                        firmName,
                        address,
                        phoneNumber,
                        websiteUrl,
                        practiceAreas,
                        experienceYears,
                        languages: languagesSpeak,
                        biography,
                    }
                });
            }

            return tx.user.findUnique({
                where: { id: userId },
                include: { lawyerProfile: true }
            });
        });

        if (!updatedUser) {
            throw new AppError('Failed to update profile', 500);
        }

        const { password: _, ...userWithoutPassword } = updatedUser;

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: userWithoutPassword,
        });
    } catch (error) {
        next(error);
    }
}
