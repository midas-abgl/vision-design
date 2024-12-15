import type { Client as DbClient, LegalTerms as DbLegalTerms, Shirt } from "@database";
import type { Selectable } from "kysely";

declare global {
	type Client = Omit<Selectable<DbClient>, "createdAt" | "updatedAt">;

	type LegalTerms = Omit<Selectable<DbLegalTerms>, "createdAt" | "updatedAt">;

	type ShirtListing = Record<string, Omit<Shirt, "id" | "manufacturingPrice">>;
}
