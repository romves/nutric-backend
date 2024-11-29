/*
  Warnings:

  - A unique constraint covering the columns `[food_id]` on the table `food_micronutrients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_FoodAllergy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodAllergy_AB_unique" ON "_FoodAllergy"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodAllergy_B_index" ON "_FoodAllergy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "food_micronutrients_food_id_key" ON "food_micronutrients"("food_id");

-- AddForeignKey
ALTER TABLE "_FoodAllergy" ADD CONSTRAINT "_FoodAllergy_A_fkey" FOREIGN KEY ("A") REFERENCES "allergy"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodAllergy" ADD CONSTRAINT "_FoodAllergy_B_fkey" FOREIGN KEY ("B") REFERENCES "food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
