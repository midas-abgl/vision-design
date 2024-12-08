"use client";
import { ShirtSection } from "@components";
import { useQueryState } from "nuqs";

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
	const [current, setColor] = useQueryState("cor", { history: "push" });
	const [selectedModel] = useQueryState("modelo");

	if (!selectedModel) return null;

	const { colors } = models[selectedModel];

	if (!current) setColor(colors[0]);

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
