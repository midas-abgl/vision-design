import { database } from "@database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	const currentTerm = await database
		.selectFrom("LegalTerms")
		.select(["id", "text"])
		.orderBy("createdAt desc")
		.executeTakeFirst();

	return NextResponse.json(currentTerm);
}
