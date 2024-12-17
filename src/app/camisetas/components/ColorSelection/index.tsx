"use client";
import { ShirtSection } from "@components";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";

export interface ColorSelectionProps {
	models: ShirtListing;
}

const hexCodes = new Map<string, string>([
	["azul", "#7ed1ef"],
	["azul escuro", "#17519b"],
	["branco", "#ffffff"],
	["laranja", "#ffc300"],
	["preto", "#434343cc"],
	["rosa", "#ff69b4"],
	["roxo", "#9703d188"],
	["verde", "#32cd32"],
	["vinho", "#730303"],
]);

export function ColorSelection({ models }: ColorSelectionProps) {
	const [selectedModel] = useQueryState("modelo", parseAsString.withDefault(Object.keys(models)[0]));

	const { colors } = models[selectedModel];

	const [current, setColor] = useQueryState("cor");
	const [order] = useQueryState("pedido");

	if (!selectedModel) return null;

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional
	useEffect(() => {
		if (!current && !order) {
			setColor(colors[0]);
		}
	}, [order, setColor]);

	return (
		<ShirtSection
			title="Cores"
			data={colors}
			tooltips={colors}
			columns={6}
			text={false}
			backgrounds={colors.map(color => color.split(" e ").map(color => hexCodes.get(color.toLowerCase())!))}
			state={[current, setColor]}
		/>
	);
}
