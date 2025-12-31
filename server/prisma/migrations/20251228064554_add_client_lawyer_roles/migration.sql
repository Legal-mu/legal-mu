/*
  Warnings:

  - The values [VISITOR] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `lawyer_profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'CLIENT', 'LAWYER');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CLIENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "lawyer_profiles" DROP CONSTRAINT "lawyer_profiles_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "approval_status" "ApprovalStatus",
ADD COLUMN     "approved_at" TIMESTAMP(3),
ADD COLUMN     "approved_by" TEXT,
ADD COLUMN     "rejected_reason" TEXT,
ALTER COLUMN "role" SET DEFAULT 'CLIENT';

-- DropTable
DROP TABLE "lawyer_profiles";
