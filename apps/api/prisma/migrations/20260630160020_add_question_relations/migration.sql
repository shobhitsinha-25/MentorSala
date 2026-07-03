/*
  Warnings:

  - You are about to drop the column `chapter` on the `PracticeQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `PracticeQuestion` table. All the data in the column will be lost.
  - Added the required column `chapterId` to the `PracticeQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `PracticeQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionType` to the `PracticeQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `PracticeQuestion` table without a default value. This is not possible if the table is not empty.
  - Made the column `options` on table `PracticeQuestion` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `answer` on the `PracticeQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SINGLE_CORRECT', 'MULTIPLE_CORRECT', 'INTEGER', 'ASSERTION_REASON');

-- DropIndex
DROP INDEX "PracticeQuestion_chapter_idx";

-- DropIndex
DROP INDEX "PracticeQuestion_difficulty_idx";

-- DropIndex
DROP INDEX "PracticeQuestion_examType_idx";

-- DropIndex
DROP INDEX "PracticeQuestion_subject_idx";

-- AlterTable
ALTER TABLE "PracticeQuestion" DROP COLUMN "chapter",
DROP COLUMN "subject",
ADD COLUMN     "chapterId" TEXT NOT NULL,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "optionImages" JSONB,
ADD COLUMN     "questionImageUrl" TEXT,
ADD COLUMN     "questionType" "QuestionType" NOT NULL,
ADD COLUMN     "solutionImageUrl" TEXT,
ADD COLUMN     "subjectId" TEXT NOT NULL,
ALTER COLUMN "options" SET NOT NULL,
DROP COLUMN "answer",
ADD COLUMN     "answer" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "PracticeQuestion" ADD CONSTRAINT "PracticeQuestion_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticeQuestion" ADD CONSTRAINT "PracticeQuestion_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
