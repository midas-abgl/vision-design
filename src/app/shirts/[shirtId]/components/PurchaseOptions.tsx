"use client";
import { setUrlState } from "@utils";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../styles.module.scss";

export interface PurchaseOptionsProps {
	colors: string[];
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
	const { replace } = useRouter();
	const choices = useSearchParams();

	return (
		<div className={styles.purchaseOptions}>
			<div className={styles.sizesAvailable}>
				{sizes.map(size => (
					<button
						key={size}
						type="button"
						onClick={() => replace(setUrlState("size", size))}
						style={{ backgroundColor: choices.get("size") === size ? "#444" : "transparent" }}
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
							onClick={() => replace(setUrlState("color", color))}
							style={{
								backgroundColor: choices.get("color") === color ? active : background,
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
