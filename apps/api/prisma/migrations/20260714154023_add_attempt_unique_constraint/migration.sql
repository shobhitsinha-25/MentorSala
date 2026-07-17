/*
  Warnings:

  - A unique constraint covering the columns `[userId,testId,attemptNumber]` on the table `TestAttempt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestAttempt_userId_testId_attemptNumber_key" ON "TestAttempt"("userId", "testId", "attemptNumber");
