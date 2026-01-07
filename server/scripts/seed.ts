import prisma from '../src/db/prisma';
import { UserRole, UserStatus } from '../src/generated/prisma/enums';
import bcrypt from 'bcryptjs';

async function main() {
    const adminEmail = 'admin@legal.mu';
    const adminPassword = 'AdminPassword123!';

    console.log('🌱 Seeding database...');

    // Delete all existing admins to start fresh as requested
    console.log('🧹 Cleaning up old admins...');
    await prisma.user.deleteMany({
        where: { role: UserRole.ADMIN },
    });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    console.log('✨ Creating new admin user...');
    await prisma.user.create({
        data: {
            firstName: 'System',
            lastName: 'Admin',
            email: adminEmail,
            password: hashedPassword,
            role: UserRole.ADMIN,
            status: UserStatus.APPROVED,
            isActive: true,
        },
    });

    console.log('✅ Admin user seeded successfully!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
