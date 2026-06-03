/*
  Warnings:

  - The `targetExam` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('JEE', 'WBJEE', 'BOARDS');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('NOT_STARTED', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'MISSED');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentClass" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastActiveAt" TIMESTAMP(3),
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferredLanguage" TEXT,
ADD COLUMN     "studyHours" TEXT,
ADD COLUMN     "targetYear" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
DROP COLUMN "targetExam",
ADD COLUMN     "targetExam" "ExamType";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Enrollment";

-- DropEnum
DROP TYPE "CourseCategory";

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "approvedById" TEXT,
    "phoneNumber" TEXT,
    "resumeUrl" TEXT,
    "bio" TEXT,
    "profileHeadline" TEXT,
    "profileImage" TEXT,
    "qualification" TEXT,
    "experienceYears" INTEGER,
    "expertise" TEXT[],
    "skills" TEXT[],
    "languages" TEXT[],
    "youtubeUrl" TEXT,
    "linkedinUrl" TEXT,
    "websiteUrl" TEXT,
    "twitterUrl" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "earnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "availableForMentorship" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "subjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectMentor" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubjectMentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentMentorPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentMentorPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "durationInDays" INTEGER NOT NULL,
    "sessionsPerMonth" INTEGER NOT NULL,
    "practiceQuestionsLimit" INTEGER,
    "unlimitedPractice" BOOLEAN NOT NULL DEFAULT false,
    "prioritySupport" BOOLEAN NOT NULL DEFAULT false,
    "mentorSelectionEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "remainingSessions" INTEGER NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startsAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorAvailability" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorBlockedDate" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "blockedDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MentorBlockedDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorshipSession" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "meetingLink" TEXT,
    "mentorNotes" TEXT,
    "studentFeedback" TEXT,
    "cancellationReason" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorshipSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticeQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" JSONB,
    "answer" TEXT NOT NULL,
    "solution" TEXT,
    "difficulty" "DifficultyLevel" NOT NULL,
    "year" INTEGER,
    "examType" "ExamType" NOT NULL,
    "marks" INTEGER,
    "negativeMarks" DOUBLE PRECISION,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "subjectId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PracticeQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "selectedAnswer" TEXT,
    "timeTaken" INTEGER,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorReview" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "mentorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MentorReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_userId_key" ON "Mentor"("userId");

-- CreateIndex
CREATE INDEX "Mentor_status_idx" ON "Mentor"("status");

-- CreateIndex
CREATE INDEX "Mentor_isVerified_idx" ON "Mentor"("isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_slug_key" ON "Subject"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_slug_key" ON "Chapter"("slug");

-- CreateIndex
CREATE INDEX "Chapter_subjectId_idx" ON "Chapter"("subjectId");

-- CreateIndex
CREATE INDEX "SubjectMentor_subjectId_idx" ON "SubjectMentor"("subjectId");

-- CreateIndex
CREATE INDEX "SubjectMentor_mentorId_idx" ON "SubjectMentor"("mentorId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectMentor_subjectId_mentorId_key" ON "SubjectMentor"("subjectId", "mentorId");

-- CreateIndex
CREATE INDEX "StudentMentorPreference_userId_idx" ON "StudentMentorPreference"("userId");

-- CreateIndex
CREATE INDEX "StudentMentorPreference_subjectId_idx" ON "StudentMentorPreference"("subjectId");

-- CreateIndex
CREATE INDEX "StudentMentorPreference_mentorId_idx" ON "StudentMentorPreference"("mentorId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentMentorPreference_userId_subjectId_key" ON "StudentMentorPreference"("userId", "subjectId");

-- CreateIndex
CREATE INDEX "UserSubscription_userId_idx" ON "UserSubscription"("userId");

-- CreateIndex
CREATE INDEX "UserSubscription_planId_idx" ON "UserSubscription"("planId");

-- CreateIndex
CREATE INDEX "UserSubscription_status_idx" ON "UserSubscription"("status");

-- CreateIndex
CREATE INDEX "MentorAvailability_mentorId_idx" ON "MentorAvailability"("mentorId");

-- CreateIndex
CREATE UNIQUE INDEX "MentorAvailability_mentorId_dayOfWeek_startTime_endTime_key" ON "MentorAvailability"("mentorId", "dayOfWeek", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "MentorBlockedDate_mentorId_idx" ON "MentorBlockedDate"("mentorId");

-- CreateIndex
CREATE INDEX "MentorBlockedDate_blockedDate_idx" ON "MentorBlockedDate"("blockedDate");

-- CreateIndex
CREATE INDEX "MentorshipSession_mentorId_idx" ON "MentorshipSession"("mentorId");

-- CreateIndex
CREATE INDEX "MentorshipSession_studentId_idx" ON "MentorshipSession"("studentId");

-- CreateIndex
CREATE INDEX "MentorshipSession_scheduledAt_idx" ON "MentorshipSession"("scheduledAt");

-- CreateIndex
CREATE INDEX "MentorshipSession_status_idx" ON "MentorshipSession"("status");

-- CreateIndex
CREATE UNIQUE INDEX "MentorshipSession_mentorId_scheduledAt_key" ON "MentorshipSession"("mentorId", "scheduledAt");

-- CreateIndex
CREATE INDEX "PracticeQuestion_subjectId_idx" ON "PracticeQuestion"("subjectId");

-- CreateIndex
CREATE INDEX "PracticeQuestion_chapterId_idx" ON "PracticeQuestion"("chapterId");

-- CreateIndex
CREATE INDEX "PracticeQuestion_difficulty_idx" ON "PracticeQuestion"("difficulty");

-- CreateIndex
CREATE INDEX "PracticeQuestion_examType_idx" ON "PracticeQuestion"("examType");

-- CreateIndex
CREATE INDEX "QuestionAttempt_userId_idx" ON "QuestionAttempt"("userId");

-- CreateIndex
CREATE INDEX "QuestionAttempt_questionId_idx" ON "QuestionAttempt"("questionId");

-- CreateIndex
CREATE INDEX "MentorReview_mentorId_idx" ON "MentorReview"("mentorId");

-- CreateIndex
CREATE INDEX "MentorReview_studentId_idx" ON "MentorReview"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "MentorReview_mentorId_studentId_key" ON "MentorReview"("mentorId", "studentId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectMentor" ADD CONSTRAINT "SubjectMentor_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectMentor" ADD CONSTRAINT "SubjectMentor_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMentorPreference" ADD CONSTRAINT "StudentMentorPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMentorPreference" ADD CONSTRAINT "StudentMentorPreference_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMentorPreference" ADD CONSTRAINT "StudentMentorPreference_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorAvailability" ADD CONSTRAINT "MentorAvailability_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorBlockedDate" ADD CONSTRAINT "MentorBlockedDate_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipSession" ADD CONSTRAINT "MentorshipSession_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorshipSession" ADD CONSTRAINT "MentorshipSession_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeQuestion" ADD CONSTRAINT "PracticeQuestion_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeQuestion" ADD CONSTRAINT "PracticeQuestion_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttempt" ADD CONSTRAINT "QuestionAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttempt" ADD CONSTRAINT "QuestionAttempt_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "PracticeQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorReview" ADD CONSTRAINT "MentorReview_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorReview" ADD CONSTRAINT "MentorReview_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
