import type { PropsWithChildren } from "react";
import WebVitals from "./components/WebVitals";

import "./_global.scss";

const siteName = "Vision Design - by Midas";
const url = "https://vision.midas.codes";

export const metadata = {
	applicationName: siteName,
	appleWebApp: {
		title: siteName,
	},
	metadataBase: new URL(url),
	openGraph: {
		images: [
			{
				url: "/opengraph.jpg",
				width: 1200,
				height: 627,
				alt: siteName,
			},
		],
		siteName,
		type: "website",
	},
	title: {
		default: siteName,
		template: `%s | ${siteName}`,
	},
	twitter: {
		card: "summary_large_image",
		creator: `${process.env.NEXT_PUBLIC_SITE_CONTENT_CREATOR}` || "@hyoretsu",
	},
};
export const viewport = {
	themeColor: "#4F53B7",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="theme-color" content={viewport.themeColor} />
			</head>
			<body>
				<main style={{ flex: 1, padding: "20px" }}>{children}</main>

				{process.env.NODE_ENV === "production" && <WebVitals />}
			</body>
		</html>
	);
}
