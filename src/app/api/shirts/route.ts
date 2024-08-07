import prisma from "@database";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const id = searchParams.get("id");

	if (id) {
		const shirt = await prisma.shirt.findUnique({ where: { id } });

		return NextResponse.json(shirt);
	}

	const shirts = await prisma.shirt.findMany();

	return NextResponse.json(shirts);
}
