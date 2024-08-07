import prisma from "@database";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const id = searchParams.get("id")!;

	const order = await prisma.shirtOrder.findUnique({
		where: { id },
		include: {
			shirt: true,
		},
	});

	return NextResponse.json(order);
}

export async function POST(req: Request) {
	const { client: clientData, color, modelId: shirtId, size } = await req.json();

	let client = await prisma.client.findUnique({ where: { email: clientData.email } });
	if (!client) {
		client = await prisma.client.create({
			data: {
				email: clientData.email,
				name: clientData.name,
				phoneNumber: clientData.phoneNumber,
			},
		});
	}

	const order = await prisma.shirtOrder.create({
		data: {
			color,
			downPayment: 20,
			clientId: client.id,
			shirtId,
			size,
		},
	});

	return Response.json(order);
}
