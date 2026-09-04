-- CreateEnum
CREATE TYPE "PlanLimitType" AS ENUM ('LIMITED', 'UNLIMITED', 'NOT_ALLOWED');

-- CreateEnum
CREATE TYPE "PlanLimitPeriod" AS ENUM ('DAILY', 'MONTHLY', 'LIFETIME');

-- CreateTable
CREATE TABLE "PlanTestLimit" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "testType" "TestType" NOT NULL,
    "limitType" "PlanLimitType" NOT NULL DEFAULT 'LIMITED',
    "limit" INTEGER,
    "period" "PlanLimitPeriod" NOT NULL DEFAULT 'MONTHLY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanTestLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlanTestLimit_planId_idx" ON "PlanTestLimit"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanTestLimit_planId_testType_key" ON "PlanTestLimit"("planId", "testType");

-- AddForeignKey
ALTER TABLE "PlanTestLimit" ADD CONSTRAINT "PlanTestLimit_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
