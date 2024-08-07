/*
  Warnings:

  - Made the column `clientId` on table `ShirtOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ShirtOrder" DROP CONSTRAINT "ShirtOrder_clientId_fkey";

-- AlterTable
ALTER TABLE "ShirtOrder" ALTER COLUMN "clientId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ShirtOrder" ADD CONSTRAINT "ShirtOrder_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
