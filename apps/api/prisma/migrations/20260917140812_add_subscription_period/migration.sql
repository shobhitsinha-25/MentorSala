-- AlterEnum
ALTER TYPE "PlanLimitPeriod" ADD VALUE 'SUBSCRIPTION';

-- AlterTable
ALTER TABLE "UserSubscription" ADD COLUMN     "isTrial" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "paymentId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "UserSubscription_isTrial_idx" ON "UserSubscription"("isTrial");
