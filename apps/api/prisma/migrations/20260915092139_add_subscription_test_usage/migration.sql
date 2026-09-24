-- CreateTable
CREATE TABLE "SubscriptionTestUsage" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "testType" "TestType" NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "used" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionTestUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubscriptionTestUsage_subscriptionId_idx" ON "SubscriptionTestUsage"("subscriptionId");

-- CreateIndex
CREATE INDEX "SubscriptionTestUsage_testType_idx" ON "SubscriptionTestUsage"("testType");

-- CreateIndex
CREATE INDEX "SubscriptionTestUsage_periodStart_periodEnd_idx" ON "SubscriptionTestUsage"("periodStart", "periodEnd");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionTestUsage_subscriptionId_testType_periodStart_key" ON "SubscriptionTestUsage"("subscriptionId", "testType", "periodStart");

-- AddForeignKey
ALTER TABLE "SubscriptionTestUsage" ADD CONSTRAINT "SubscriptionTestUsage_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "UserSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
