import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import { Analytics } from "@vercel/analytics/react";
import type { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { Footer, Header, WebVitals } from "./components";
import { Background } from "./components/Background";
import "./embla.css";
import "./global.css";
import { Providers } from "./providers";

// @ts-expect-error: This is a hack
BigInt.prototype.toJSON = function () {
	const int = Number.parseInt(this.toString());
	return int ?? this.toString();
};

const siteName = "Vision Design - by Midas";
const url = "https://vd.hyoretsu.com";

export const metadata = {
	applicationName: siteName,
	appleWebApp: {
		title: siteName,
	},
	metadataBase: new URL(url),
	openGraph: {
		images: [
			{
				url: "/opengraph.png",
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
		<html lang="en" className="dark bg-background text-foreground" suppressHydrationWarning>
			<head>
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="theme-color" content={viewport.themeColor} />
			</head>

			<body className="relative flex" suppressHydrationWarning>
				<Providers>
					<Header />

					{children}

					<Footer />
				</Providers>

				<ToastContainer toastClassName="!*:normal-case" />
				<Analytics />
				<Background />

				{process.env.NODE_ENV === "production" && <WebVitals />}
			</body>
		</html>
	);
}
