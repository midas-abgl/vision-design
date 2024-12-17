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
		<NextUIProvider className="flex flex-col justify-between p-8 backdrop-blur-3xl lg:h-[100vh] lg:px-24 lg:py-20">
			<NuqsAdapter>
				<AppStoreProvider>{children}</AppStoreProvider>
			</NuqsAdapter>
		</NextUIProvider>
	);
}
