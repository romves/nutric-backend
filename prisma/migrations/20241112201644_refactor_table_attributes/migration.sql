/*
  Warnings:

  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "health_info" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "age" INTEGER NOT NULL,
    "activity_level" TEXT NOT NULL,

    CONSTRAINT "health_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "health_info_id" TEXT NOT NULL,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_nutrition" (
    "id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "food_nutrition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_micronutrients" (
    "id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "vitamin_a" DOUBLE PRECISION,
    "vitamin_c" DOUBLE PRECISION,
    "calcium" DOUBLE PRECISION,
    "iron" DOUBLE PRECISION,
    "magnesium" DOUBLE PRECISION,
    "potassium" DOUBLE PRECISION,
    "zinc" DOUBLE PRECISION,

    CONSTRAINT "food_micronutrients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_log" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "meal_time" TIMESTAMP(3) NOT NULL,
    "serving_size" DOUBLE PRECISION NOT NULL,
    "serving_unit" TEXT NOT NULL,

    CONSTRAINT "meal_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan_history" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "scan_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "health_info_user_id_key" ON "health_info"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "food_nutrition_food_id_key" ON "food_nutrition"("food_id");

-- AddForeignKey
ALTER TABLE "health_info" ADD CONSTRAINT "health_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergy" ADD CONSTRAINT "Allergy_health_info_id_fkey" FOREIGN KEY ("health_info_id") REFERENCES "health_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_nutrition" ADD CONSTRAINT "food_nutrition_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_micronutrients" ADD CONSTRAINT "food_micronutrients_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_log" ADD CONSTRAINT "meal_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_log" ADD CONSTRAINT "meal_log_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan_history" ADD CONSTRAINT "scan_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scan_history" ADD CONSTRAINT "scan_history_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
