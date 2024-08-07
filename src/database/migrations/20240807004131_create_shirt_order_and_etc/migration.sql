/*
  Warnings:

  - You are about to alter the column `model` on the `Shirt` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `photos` on the `Shirt` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `colors` on the `Shirt` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "Shirt" ALTER COLUMN "model" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "photos" SET DATA TYPE VARCHAR(100)[],
ALTER COLUMN "colors" SET DATA TYPE VARCHAR(15)[];

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "phoneNumber" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShirtBatch" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderedAt" DATE NOT NULL,
    "receivedAt" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShirtBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShirtOrder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID,
    "batchId" UUID,
    "modelId" UUID NOT NULL,
    "size" VARCHAR(3) NOT NULL,
    "color" VARCHAR(15) NOT NULL,
    "downPayment" DECIMAL(4,2) NOT NULL,
    "finalPayment" DECIMAL(4,2),
    "receipts" VARCHAR(100)[],
    "cancelledAt" DATE,
    "deliveredTo" VARCHAR(50),
    "deliveredAt" DATE,
    "expiredAt" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShirtOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShirtOrder" ADD CONSTRAINT "ShirtOrder_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShirtOrder" ADD CONSTRAINT "ShirtOrder_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "ShirtBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShirtOrder" ADD CONSTRAINT "ShirtOrder_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Shirt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
