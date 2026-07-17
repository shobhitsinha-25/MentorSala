/*
  Warnings:

  - Added the required column `attemptNumber` to the `TestAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestAttempt" ADD COLUMN     "attemptNumber" INTEGER NOT NULL;
