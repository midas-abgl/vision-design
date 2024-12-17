ALTER TABLE "ShirtOrder"
DROP CONSTRAINT "ShirtOrder_LegalTerms_fkey",
DROP COLUMN "termAccepted" BIGINT;
