"use server";
import { type Body, SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
	region: process.env.AWS_REGION || "us-east-1",
});

export interface SendMailArgs {
	body: string;
	bcc?: string | string[];
	cc?: string | string[];
	isHtml?: boolean;
	subject: string;
	to: string | string[];
}

export const sendMail = async ({ body, bcc, cc, isHtml = false, subject, to }: SendMailArgs) => {
	const bodyObj = { Data: body };

	const Body: Body = {};

	if (isHtml) {
		Body.Html = bodyObj;
	} else {
		Body.Text = bodyObj;
	}

	await sesClient.send(
		new SendEmailCommand({
			Source: "Vision Design <vision.design.cc@gmail.com>",
			Destination: {
				ToAddresses: !Array.isArray(to) ? [to] : to,
				...(cc && { CcAddresses: !Array.isArray(cc) ? [cc] : cc }),
				...(bcc && { BccAddresses: !Array.isArray(bcc) ? [bcc] : bcc }),
			},
			Message: {
				Subject: { Data: subject },
				Body,
			},
		}),
	);
};
