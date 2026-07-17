-- CreateIndex
CREATE INDEX "TestAttempt_userId_testId_status_idx" ON "TestAttempt"("userId", "testId", "status");
