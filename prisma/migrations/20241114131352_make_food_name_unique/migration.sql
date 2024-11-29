/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `food` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "food_name_key" ON "food"("name");
