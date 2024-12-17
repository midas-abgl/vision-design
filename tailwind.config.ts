import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	plugins: [
		nextui({
			addCommonColors: true,
			themes: {
				dark: {
					colors: {
						background: "rgba(0, 0, 0, 0.95)",
						content1: "#353535",
						default: {
							DEFAULT: "#d9d9d988",
							foreground: "#d9d9d9",
						},
					},
					layout: {},
				},
			},
		}),
	],
	theme: {
		extend: {
			colors: {
				highlight: "#32e6f9",
			},
		},
	},
} satisfies Config;
