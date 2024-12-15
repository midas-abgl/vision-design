"use client";
import { useQueryState } from "nuqs";

export interface PurchaseSectionProps {
	models: ShirtListing;
}

export function PriceSection({ models }: PurchaseSectionProps) {
	const [modelId] = useQueryState("modelo");

	return (
		<div className="flex flex-col items-center">
			<span>Preço:</span>
			<span>R${models[modelId!]?.prices[0] || 52}</span>
		</div>
	);
}
