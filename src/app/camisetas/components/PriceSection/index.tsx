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
			<span className="text-xl">R$ {(models[modelId!]?.prices[0] || 51.99).toLocaleString("pt-BR")}</span>
		</div>
	);
}
