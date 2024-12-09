/*
  Warnings:

  - Added the required column `fiber` to the `food_nutrition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sugar` to the `food_nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "food_nutrition" ADD COLUMN     "fiber" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sugar" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "daily_target" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "fiber" DOUBLE PRECISION NOT NULL,
    "sugar" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "daily_target_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_target_user_id_key" ON "daily_target"("user_id");

-- AddForeignKey
ALTER TABLE "daily_target" ADD CONSTRAINT "daily_target_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
