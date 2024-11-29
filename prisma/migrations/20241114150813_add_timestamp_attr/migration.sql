/*
  Warnings:

  - You are about to drop the column `meal_time` on the `meal_log` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `meal_log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `scan_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meal_log" DROP COLUMN "meal_time",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "scan_history" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
