/*
  Warnings:

  - You are about to drop the column `approval_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `approved_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `approved_by` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `rejected_reason` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "approval_status",
DROP COLUMN "approved_at",
DROP COLUMN "approved_by",
DROP COLUMN "rejected_reason",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'APPROVED';

-- DropEnum
DROP TYPE "ApprovalStatus";
