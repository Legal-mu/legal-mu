/*
  Warnings:

  - You are about to drop the column `address` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `legal_name` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `professional_email` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `reg_number` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `lawyer_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `lawyer_profiles` table. All the data in the column will be lost.
  - Added the required column `full_legal_name` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professional_address` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professional_title` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_number` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `years_of_experience` to the `lawyer_profiles` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `lawyer_profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value_proposition` on table `lawyer_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lawyer_profiles" DROP COLUMN "address",
DROP COLUMN "experience",
DROP COLUMN "legal_name",
DROP COLUMN "professional_email",
DROP COLUMN "reg_number",
DROP COLUMN "title",
DROP COLUMN "website",
ADD COLUMN     "full_legal_name" TEXT NOT NULL,
ADD COLUMN     "professional_address" TEXT NOT NULL,
ADD COLUMN     "professional_title" TEXT NOT NULL,
ADD COLUMN     "registration_number" TEXT NOT NULL,
ADD COLUMN     "website_url" TEXT,
ADD COLUMN     "years_of_experience" INTEGER NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "value_proposition" SET NOT NULL;

-- DropEnum
DROP TYPE "ProfessionalTitle";
