/*
  Warnings:

  - You are about to drop the `Allergy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Allergy" DROP CONSTRAINT "Allergy_health_info_id_fkey";

-- DropTable
DROP TABLE "Allergy";

-- CreateTable
CREATE TABLE "allergy" (
    "name" TEXT NOT NULL,
    "description" TEXT,
    "health_info_id" TEXT,

    CONSTRAINT "allergy_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "allergy_name_key" ON "allergy"("name");

-- AddForeignKey
ALTER TABLE "allergy" ADD CONSTRAINT "allergy_health_info_id_fkey" FOREIGN KEY ("health_info_id") REFERENCES "health_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;
