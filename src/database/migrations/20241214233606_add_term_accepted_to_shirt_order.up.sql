ALTER TABLE "ShirtOrder"
ADD COLUMN "termAccepted" BIGINT,
ADD CONSTRAINT "ShirtOrder_LegalTerms_fkey"
	FOREIGN KEY("termAccepted")
	REFERENCES "LegalTerms"("id")
	ON DELETE SET NULL ON UPDATE CASCADE;
