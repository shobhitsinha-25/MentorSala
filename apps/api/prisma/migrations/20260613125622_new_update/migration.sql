/*
  Warnings:

  - You are about to drop the column `chapterId` on the `PracticeQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `PracticeQuestion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,questionId]` on the table `QuestionAttempt` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `examType` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapter` to the `PracticeQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `PracticeQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examType` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PracticeQuestion" DROP CONSTRAINT "PracticeQuestion_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "PracticeQuestion" DROP CONSTRAINT "PracticeQuestion_subjectId_fkey";

-- DropIndex
DROP INDEX "PracticeQuestion_chapterId_idx";

-- DropIndex
DROP INDEX "PracticeQuestion_subjectId_idx";

-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "examType" "ExamType" NOT NULL;

-- AlterTable
ALTER TABLE "PracticeQuestion" DROP COLUMN "chapterId",
DROP COLUMN "subjectId",
ADD COLUMN     "chapter" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD COLUMN     "examType" "ExamType" NOT NULL;

-- CreateIndex
CREATE INDEX "PracticeQuestion_subject_idx" ON "PracticeQuestion"("subject");

-- CreateIndex
CREATE INDEX "PracticeQuestion_chapter_idx" ON "PracticeQuestion"("chapter");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionAttempt_userId_questionId_key" ON "QuestionAttempt"("userId", "questionId");
