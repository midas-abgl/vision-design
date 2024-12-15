CREATE TABLE "ShirtOrder" (
	"id" BIGINT PRIMARY KEY DEFAULT generate_tsid('ShirtOrder'),
	"clientId" BIGINT NOT NULL,
	"shirtId" BIGINT NOT NULL,
	"size" VARCHAR(3) NOT NULL,
	"babyLook" BOOLEAN NOT NULL DEFAULT FALSE,
	"color" VARCHAR(15) NOT NULL,
	"downPayment" DECIMAL(4, 2) NOT NULL,
	"finalPayment" DECIMAL(4, 2),
	"receipts" VARCHAR(112)[2] NOT NULL,
	"cancelledAt" DATE,
	"deliveredTo" VARCHAR(50),
	"deliveredAt" DATE,
	"expiredAt" DATE,
	"quantity" INTEGER NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT "ShirtOrder_Client_fkey" FOREIGN KEY("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT "ShirtOrder_Shirt_fkey" FOREIGN KEY("shirtId") REFERENCES "Shirt"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TRIGGER "ShirtOrder_updated_at"
BEFORE UPDATE ON "ShirtOrder"
FOR EACH ROW EXECUTE FUNCTION updated_at();
