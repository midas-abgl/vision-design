"use client";
import { NextUIProvider } from "@nextui-org/react";
import { NuqsAdapter } from "nuqs/adapters/next";
import type { ReactNode } from "react";

export interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<NextUIProvider
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				minHeight: "100vh",
			}}
		>
			<NuqsAdapter>{children}</NuqsAdapter>
		</NextUIProvider>
	);
}
