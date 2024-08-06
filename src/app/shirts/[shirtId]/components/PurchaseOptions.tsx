"use client";
import { useState } from "react";
import styles from "../styles.module.scss";

export interface PurchaseOptionsProps {
	colors: string[];
}

interface Choices {
	color: string;
	size: string;
}

const sizes = ["P", "M", "G", "GG", "XG", "XGG"];

interface ColorAssociations {
	active: string;
	background: string;
	text: string;
}

const colorAssoc: Record<string, ColorAssociations> = {
	Branco: {
		active: "#0002",
		background: "#fff",
		text: "#000",
	},
	Vinho: {
		active: "#f00",
		background: "#5e2129",
		text: "#fff",
	},
};

export function PurchaseOptions({ colors }: PurchaseOptionsProps) {
	const [choices, setChoices] = useState<Choices>({ color: "", size: "M" });

	return (
		<div className={styles.purchaseOptions}>
			<div className={styles.sizesAvailable}>
				{sizes.map((size, i) => (
					<button
						key={size}
						type="button"
						onClick={() =>
							setChoices(old => ({
								...old,
								size: old.size === size ? "" : size,
							}))
						}
						style={{ backgroundColor: choices.size === size ? "#444" : "transparent" }}
					>
						{size}
					</button>
				))}
			</div>

			<div className={styles.colorsAvailable}>
				{colors.map(color => {
					const { active, background, text } = colorAssoc[color];

					return (
						<button
							key={color}
							type="button"
							onClick={() =>
								setChoices(old => ({
									...old,
									color: old.color === color ? "" : color,
								}))
							}
							style={{
								backgroundColor: choices.color === color ? active : background,
								color: text,
							}}
						>
							{color}
						</button>
					);
				})}
			</div>
		</div>
	);
}
