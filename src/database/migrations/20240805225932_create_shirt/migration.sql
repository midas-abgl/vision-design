-- CreateTable
CREATE TABLE "Shirt" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "model" TEXT NOT NULL,
    "prices" DECIMAL(4,2)[],
    "photos" TEXT[],
    "colors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shirt_pkey" PRIMARY KEY ("id")
);
