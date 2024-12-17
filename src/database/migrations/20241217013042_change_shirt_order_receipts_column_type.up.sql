ALTER TABLE "ShirtOrder"
ADD COLUMN "payments" BOOLEAN[2];

UPDATE "ShirtOrder" SET "payments" = ARRAY[receipts[1] <> NULL, receipts[2] <> NULL];

ALTER TABLE "ShirtOrder" DROP COLUMN "receipts";
