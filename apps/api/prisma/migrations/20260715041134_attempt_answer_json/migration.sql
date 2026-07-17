/*
  Warnings:

  - The `selectedAnswer` column on the `AttemptAnswer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AttemptAnswer" DROP COLUMN "selectedAnswer",
ADD COLUMN     "selectedAnswer" JSONB;
