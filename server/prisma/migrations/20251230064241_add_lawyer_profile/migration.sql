/*
  Warnings:

  - You are about to drop the column `biography` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `firm_name` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `full_legal_name` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `lawyer_profiles` table. All the data in the column will be lost.
  - Added the required column `bio` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile_number` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lawyer_profiles" DROP COLUMN "biography",
DROP COLUMN "firm_name",
DROP COLUMN "full_legal_name",
DROP COLUMN "languages",
DROP COLUMN "mobile",
DROP COLUMN "phone",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "firm_chambers_name" TEXT,
ADD COLUMN     "languages_spoken" TEXT[],
ADD COLUMN     "mobile_number" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL;
