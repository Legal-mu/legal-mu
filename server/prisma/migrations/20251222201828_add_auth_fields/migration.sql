-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'INACTIVE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'LAWYER';
ALTER TYPE "UserRole" ADD VALUE 'CLIENT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'APPROVED',
ADD COLUMN     "verification_token" TEXT,
ADD COLUMN     "verification_token_exp" TIMESTAMP(3);
