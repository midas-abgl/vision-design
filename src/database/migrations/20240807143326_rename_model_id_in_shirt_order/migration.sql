/*
  Warnings:

  - You are about to drop the column `modelId` on the `ShirtOrder` table. All the data in the column will be lost.
  - Added the required column `shirtId` to the `ShirtOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShirtOrder" DROP CONSTRAINT "ShirtOrder_modelId_fkey";

-- AlterTable
ALTER TABLE "ShirtOrder" RENAME COLUMN "modelId" TO "shirtId";

-- AddForeignKey
ALTER TABLE "ShirtOrder" ADD CONSTRAINT "ShirtOrder_shirtId_fkey" FOREIGN KEY ("shirtId") REFERENCES "Shirt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
