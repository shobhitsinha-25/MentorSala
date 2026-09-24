/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `UserSubscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSubscription" ADD COLUMN     "paymentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_paymentId_key" ON "UserSubscription"("paymentId");

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
