/*
  Warnings:

  - You are about to drop the column `count_day` on the `vacation_used` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `vacation_used` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vacation_used" DROP COLUMN "count_day",
DROP COLUMN "created_date";
