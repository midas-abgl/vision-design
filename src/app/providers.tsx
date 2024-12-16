"use client";
import { AppStoreProvider } from "@context/store";
import { NextUIProvider } from "@nextui-org/react";
import { NuqsAdapter } from "nuqs/adapters/next";
import type { ReactNode } from "react";

export interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<NextUIProvider>
			<NuqsAdapter>
				<AppStoreProvider>{children}</AppStoreProvider>
			</NuqsAdapter>
		</NextUIProvider>
	);
}
