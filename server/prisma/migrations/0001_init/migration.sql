-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENT', 'LAWYER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LawyerProfileStatus" AS ENUM ('INCOMPLETE', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProfessionalTitle" AS ENUM ('BARRISTER', 'ATTORNEY', 'NOTARY');

-- CreateEnum
CREATE TYPE "LegalCategory" AS ENUM ('SENIOR_COUNSEL_SILK', 'LEADING_LAW_FIRM', 'INTERNATIONAL_CHAMBERS', 'NOTARIAL_STUDY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "date_of_birth" DATE,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "reset_token" TEXT,
    "reset_token_exp" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "google_id" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'APPROVED',
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "subscription_status" TEXT,
    "subscription_plan_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lawyer_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_legal_name" TEXT,
    "title" "ProfessionalTitle",
    "registration_number" TEXT,
    "firm_name" TEXT,
    "legal_category" "LegalCategory",
    "address" TEXT,
    "city" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "phone_number" TEXT,
    "practice_areas" TEXT[],
    "admission_year" INTEGER,
    "experience_years" INTEGER,
    "languages" TEXT[],
    "work_experience" JSONB,
    "cv_url" TEXT,
    "biography" TEXT,
    "extended_biography" TEXT,
    "headshot_url" TEXT,
    "website_url" TEXT,
    "linkedin_url" TEXT,
    "twitter_url" TEXT,
    "youtube_url" TEXT,
    "show_google_reviews" BOOLEAN NOT NULL DEFAULT false,
    "google_business_profile_url" TEXT,
    "client_testimonials" JSONB,
    "featured_success_stories" TEXT,
    "verified_badges" TEXT[],
    "client_data_upload_enabled" BOOLEAN NOT NULL DEFAULT false,
    "client_upload_notification_email" TEXT,
    "authorized_file_types" TEXT[] DEFAULT ARRAY['PDF', 'DOCX', 'JPG']::TEXT[],
    "status" "LawyerProfileStatus" NOT NULL DEFAULT 'INCOMPLETE',
    "completion_percentage" INTEGER NOT NULL DEFAULT 0,
    "completed_steps" JSONB,
    "submitted_at" TIMESTAMP(3),
    "reviewed_at" TIMESTAMP(3),
    "reviewed_by_id" TEXT,
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lawyer_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_profiles_user_id_key" ON "lawyer_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "lawyer_profiles" ADD CONSTRAINT "lawyer_profiles_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lawyer_profiles" ADD CONSTRAINT "lawyer_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

