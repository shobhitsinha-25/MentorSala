/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `MentorReview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `MentorReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MentorReview_mentorId_studentId_key";

-- AlterTable
ALTER TABLE "MentorReview" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MentorReview_sessionId_key" ON "MentorReview"("sessionId");

-- AddForeignKey
ALTER TABLE "MentorReview" ADD CONSTRAINT "MentorReview_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MentorshipSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
