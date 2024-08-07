import prisma from "@database";

export async function POST(req: Request) {
	const { client: clientData, color, modelId, size } = await req.json();

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
			modelId,
			size,
		},
	});

	return Response.json(order);
}
