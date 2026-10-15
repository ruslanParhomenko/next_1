/*
  Warnings:

  - Added the required column `current_rate` to the `employee_shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day_hours` to the `employee_shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `night_hours` to the `employee_shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `employee_shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_shift" ADD COLUMN     "current_rate" INTEGER NOT NULL,
ADD COLUMN     "day_hours" INTEGER NOT NULL,
ADD COLUMN     "night_hours" INTEGER NOT NULL,
ADD COLUMN     "salary" INTEGER NOT NULL;
