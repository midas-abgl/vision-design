"use client";
import { parseAsString, useQueryState } from "nuqs";
import styles from "./styles.module.scss";

export interface ColorSelectionProps {
	colors: string[];
}

const hexCodes = new Map<string, string>([
	["azul", " #ADD8E6"],
	["azul escuro", "	#003366"],
	["branco", " #FFFFFF"],
	["laranja", " #FFA500"],
	["preto", "#000000"],
	["rosa", " #FF69B4"],
	["roxo", " #800080"],
	["verde", " #32CD32"],
	["vinho", " #800020"],
]);

export function ColorSelection({ colors }: ColorSelectionProps) {
	const [current, setColor] = useQueryState(
		"cor",
		parseAsString.withDefault(Object.keys(colors)[0]).withOptions({ history: "push" }),
	);

	return (
		<div className={styles.container}>
			{colors.map(color => {
				const backgroundColors = color.split(" e ").map(color => hexCodes.get(color.toLowerCase())!);

				return (
					<button
						key={color}
						type="button"
						title={color}
						onClick={() => setColor(color)}
						style={{
							background:
								backgroundColors.length > 1
									? `linear-gradient( -45deg, ${backgroundColors[1]}, ${backgroundColors[1]} 49%, white 49%, white 51%, ${backgroundColors[0]} 51% )`
									: backgroundColors[0],
						}}
					/>
				);
			})}
		</div>
	);
}
