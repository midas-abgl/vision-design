import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default async function (phase: string, { defaultConfig }) {
	const baseConf: NextConfig = {
		eslint: {
			ignoreDuringBuilds: true,
		},
		experimental: {
			reactCompiler: true,
			turbo: {
				rules: {
					"*.svg": {
						loaders: ["@svgr/webpack"],
						as: "*.js",
					},
				},
			},
		},
		images: {
			remotePatterns: [{ hostname: "*" }],
		},
		output: "standalone",
		productionBrowserSourceMaps: true,
		reactStrictMode: true,
		sassOptions: {
			logger: {
				warn: (message: string) => console.warn(message),
				debug: (message: string) => console.log(message),
			},
		},
		skipTrailingSlashRedirect: true,
		typescript: {
			ignoreBuildErrors: true,
		},
		webpack: (config, options) => {
			config.module.rules.push({
				test: /\.svg$/i,
				use: ["@svgr/webpack"],
			});

			return config;
		},
	};

	// Dev-specific settings
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		Object.assign(baseConf, {});
	} else {
		Object.assign(baseConf, {});
	}

	return baseConf;
}
