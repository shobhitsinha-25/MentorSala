/*
  Warnings:

  - You are about to drop the `SubscriptionTestUsage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EntitlementResource" AS ENUM ('MENTORSHIP_SESSION', 'TEST_SERIES');

-- DropForeignKey
ALTER TABLE "SubscriptionTestUsage" DROP CONSTRAINT "SubscriptionTestUsage_subscriptionId_fkey";

-- DropTable
DROP TABLE "SubscriptionTestUsage";

-- CreateTable
CREATE TABLE "SubscriptionUsage" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "resource" "EntitlementResource" NOT NULL,
    "variant" TEXT NOT NULL DEFAULT 'DEFAULT',
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "used" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubscriptionUsage_subscriptionId_idx" ON "SubscriptionUsage"("subscriptionId");

-- CreateIndex
CREATE INDEX "SubscriptionUsage_resource_idx" ON "SubscriptionUsage"("resource");

-- CreateIndex
CREATE INDEX "SubscriptionUsage_periodStart_periodEnd_idx" ON "SubscriptionUsage"("periodStart", "periodEnd");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionUsage_subscriptionId_resource_variant_periodSta_key" ON "SubscriptionUsage"("subscriptionId", "resource", "variant", "periodStart");

-- AddForeignKey
ALTER TABLE "SubscriptionUsage" ADD CONSTRAINT "SubscriptionUsage_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "UserSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
