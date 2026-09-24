-- CreateEnum
CREATE TYPE "XPTransactionType" AS ENUM ('DAILY_PROBLEM', 'CHAPTER_TEST', 'SUBJECT_TEST', 'MOCK_TEST', 'PYQ', 'PRACTICE', 'DAILY_LOGIN');

-- CreateTable
CREATE TABLE "XPTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "XPTransactionType" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "XPTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "XPTransaction_userId_idx" ON "XPTransaction"("userId");

-- CreateIndex
CREATE INDEX "XPTransaction_userId_createdAt_idx" ON "XPTransaction"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "XPTransaction_type_idx" ON "XPTransaction"("type");

-- CreateIndex
CREATE UNIQUE INDEX "XPTransaction_userId_type_referenceId_key" ON "XPTransaction"("userId", "type", "referenceId");

-- AddForeignKey
ALTER TABLE "XPTransaction" ADD CONSTRAINT "XPTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
