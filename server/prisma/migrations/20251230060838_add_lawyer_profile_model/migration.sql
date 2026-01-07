-- CreateEnum
CREATE TYPE "ProfessionalTitle" AS ENUM ('BARRISTER', 'ATTORNEY', 'NOTARY');

-- CreateTable
CREATE TABLE "lawyer_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "title" "ProfessionalTitle" NOT NULL,
    "reg_number" TEXT NOT NULL,
    "firm_name" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "mobile" TEXT NOT NULL,
    "professional_email" TEXT,
    "website" TEXT,
    "practice_areas" TEXT[],
    "experience" INTEGER NOT NULL DEFAULT 0,
    "jurisdictions" TEXT[],
    "languages" TEXT[],
    "biography" TEXT NOT NULL,
    "value_proposition" TEXT,
    "awards" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lawyer_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_profiles_user_id_key" ON "lawyer_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "lawyer_profiles" ADD CONSTRAINT "lawyer_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
