CREATE TABLE "Client" (
	"id" BIGINT DEFAULT generate_tsid('Client'),
	"name" VARCHAR(50) NOT NULL,
	"email" VARCHAR(320) NOT NULL,
	"phoneNumber" VARCHAR(15) NOT NULL,
	"createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

CREATE TRIGGER "Client_updated_at"
BEFORE UPDATE ON "Client"
FOR EACH ROW EXECUTE FUNCTION updated_at();
