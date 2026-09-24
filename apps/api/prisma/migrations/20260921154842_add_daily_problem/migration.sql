-- CreateTable
CREATE TABLE "DailyProblem" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyProblem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyProblem_questionId_idx" ON "DailyProblem"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyProblem_date_key" ON "DailyProblem"("date");

-- AddForeignKey
ALTER TABLE "DailyProblem" ADD CONSTRAINT "DailyProblem_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "PracticeQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
