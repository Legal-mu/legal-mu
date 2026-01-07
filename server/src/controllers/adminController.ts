/**
 * Admin controller - Administrative user management
 */

import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import { AppError } from '../middleware/errorHandler';
import { UserRole, UserStatus, ProfessionalTitle } from '../generated/prisma/enums';

/**
 * Get all lawyers
 */
export async function getAllLawyers(req: Request, res: Response, next: NextFunction) {
    try {
        const lawyers = await prisma.user.findMany({
            where: { role: UserRole.LAWYER },
            include: { lawyerProfile: true },
            orderBy: { createdAt: 'desc' },
        });

        res.json({
            success: true,
            data: lawyers.map(({ password, ...user }) => user),
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get all clients
 */
export async function getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
        const clients = await prisma.user.findMany({
            where: { role: UserRole.CLIENT },
            orderBy: { createdAt: 'desc' },
        });

        res.json({
            success: true,
            data: clients.map(({ password, ...user }) => user),
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get user by ID (Lawyer or Client)
 */
export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            include: { lawyerProfile: true },
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

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
 * Update user (Admin version)
 */
export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const {
            firstName, lastName, email, role, status, isActive,
            // Lawyer profile fields
            lawyerProfile
        } = req.body;

        // Check if user exists before attempting update
        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            throw new AppError('User not found', 404);
        }

        const updatedUser = await prisma.$transaction(async (tx) => {
            // Update User base data
            const user = await tx.user.update({
                where: { id },
                data: {
                    firstName,
                    lastName,
                    email: email?.toLowerCase(),
                    role,
                    status,
                    isActive,
                },
            });

            // Update LawyerProfile if applicable
            if (lawyerProfile && (role === UserRole.LAWYER || user.role === UserRole.LAWYER)) {
                await tx.lawyerProfile.upsert({
                    where: { userId: id },
                    create: {
                        user: { connect: { id } },
                        fullLegalName: lawyerProfile.fullLegalName || `${user.firstName} ${user.lastName}`,
                        title: lawyerProfile.title || ProfessionalTitle.BARRISTER,
                        registrationNumber: lawyerProfile.registrationNumber || 'PENDING',
                        firmName: lawyerProfile.firmName,
                        address: lawyerProfile.address || 'PENDING',
                        phoneNumber: lawyerProfile.phoneNumber || 'PENDING',
                        mobileNumber: lawyerProfile.mobileNumber || 'PENDING',
                        websiteUrl: lawyerProfile.websiteUrl,
                        practiceAreas: lawyerProfile.practiceAreas || [],
                        experienceYears: lawyerProfile.experienceYears || 0,
                        jurisdictions: lawyerProfile.jurisdictions || [],
                        languages: lawyerProfile.languages || [],
                        biography: lawyerProfile.biography || '',
                        valueProposition: lawyerProfile.valueProposition || '',
                        awards: lawyerProfile.awards,
                    },
                    update: {
                        ...lawyerProfile
                    }
                });
            }

            return tx.user.findUnique({
                where: { id },
                include: { lawyerProfile: true }
            });
        });

        const { password: _, ...userWithoutPassword } = updatedUser!;

        res.json({
            success: true,
            message: 'User updated successfully',
            data: userWithoutPassword,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Delete user
 */
export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Delete user (Prisma cascade will handle LawyerProfile)
        await prisma.user.delete({
            where: { id },
        });

        res.json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}
