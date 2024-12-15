import { database } from "@database";
import { type NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

interface PatchArgs {
	params: Promise<{ orderId: string }>;
}

export async function PATCH(req: NextRequest, { params }: PatchArgs) {
	const { orderId } = await params;

	const order = await database.selectFrom("ShirtOrder").where("id", "=", orderId).executeTakeFirst();
	if (!order) {
		return new NextResponse("Pedido não encontrado", { status: StatusCodes.NOT_FOUND });
	}

	const updatedData = await req.json();

	if (updatedData.termAccepted === null) {
		updatedData.termAccepted = "0";
	}

	await database.updateTable("ShirtOrder").set(updatedData).where("id", "=", orderId).execute();

	return new NextResponse("", { status: StatusCodes.OK });
}
