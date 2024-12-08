import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import prisma from "@database";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const orderId = formData.get("orderId") as string;
	const receipt = formData.get("receipt") as File;

	const s3Client = new S3Client({
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY!,
			secretAccessKey: process.env.S3_SECRET_KEY!,
		},
		region: "us-east-2",
	});

	const ContentType = receipt.type;
	const Key = `shirts/receipts/${orderId}/down.${ContentType.split("/")[1]}`;

	await Promise.all([
		s3Client.send(
			new PutObjectCommand({
				Bucket: "vision-design",
				Key,
				Body: Buffer.from(await receipt.arrayBuffer()),
				ContentType,
			}),
		),
		prisma.shirtOrder.update({
			data: {
				receipts: [`https://vision-design.s3.us-east-2.amazonaws.com/${Key}`],
			},
			where: {
				id: orderId,
			},
		}),
	]);

	return NextResponse.json(null);
}
