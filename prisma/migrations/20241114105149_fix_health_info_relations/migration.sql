/*
  Warnings:

  - You are about to drop the column `health_info_id` on the `allergy` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "allergy" DROP CONSTRAINT "allergy_health_info_id_fkey";

-- AlterTable
ALTER TABLE "allergy" DROP COLUMN "health_info_id";

-- CreateTable
CREATE TABLE "_AllergyToHealthInfo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AllergyToHealthInfo_AB_unique" ON "_AllergyToHealthInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_AllergyToHealthInfo_B_index" ON "_AllergyToHealthInfo"("B");

-- AddForeignKey
ALTER TABLE "_AllergyToHealthInfo" ADD CONSTRAINT "_AllergyToHealthInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "allergy"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergyToHealthInfo" ADD CONSTRAINT "_AllergyToHealthInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "health_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
