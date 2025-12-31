-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'CLIENT';
ALTER TYPE "UserRole" ADD VALUE 'LAWYER';

-- CreateTable
CREATE TABLE "lawyer_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "registration_number" TEXT NOT NULL,
    "firm_name" TEXT,
    "professional_address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "website_url" TEXT,
    "practice_areas" TEXT[],
    "experience_years" INTEGER NOT NULL,
    "jurisdictions" TEXT[],
    "languages" TEXT[],
    "bio" TEXT NOT NULL,
    "value_proposition" TEXT NOT NULL,
    "awards" TEXT,
    "approval_status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lawyer_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_profiles_user_id_key" ON "lawyer_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "lawyer_profiles" ADD CONSTRAINT "lawyer_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
