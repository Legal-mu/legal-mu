/*
  Warnings:

  - You are about to drop the `lawyer_profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lawyer_profiles" DROP CONSTRAINT "lawyer_profiles_userId_fkey";

-- DropTable
DROP TABLE "lawyer_profiles";
