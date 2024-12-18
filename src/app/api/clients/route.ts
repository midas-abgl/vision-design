import { database } from "@database";
import { NextResponse } from "next/server";

export async function GET() {
	const clients = await database
		.selectFrom("Client")
		.select(["id", "name", "email", "phoneNumber"])
		.execute();

	return NextResponse.json(clients);
}
