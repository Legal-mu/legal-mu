/*
  Warnings:

  - You are about to drop the column `firm_chambers_name` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `mobile_number` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `lawyer_profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `lawyer_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `full_legal_name` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lawyer_profiles" DROP CONSTRAINT "lawyer_profiles_user_id_fkey";

-- DropIndex
DROP INDEX "lawyer_profiles_user_id_key";

-- AlterTable
ALTER TABLE "lawyer_profiles" DROP COLUMN "firm_chambers_name",
DROP COLUMN "mobile_number",
DROP COLUMN "phone_number",
DROP COLUMN "user_id",
ADD COLUMN     "firm_name" TEXT,
ADD COLUMN     "full_legal_name" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_profiles_userId_key" ON "lawyer_profiles"("userId");

-- AddForeignKey
ALTER TABLE "lawyer_profiles" ADD CONSTRAINT "lawyer_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
