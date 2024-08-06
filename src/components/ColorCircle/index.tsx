"use client";
import styles from "./styles.module.scss";

export interface ColorCircleProps {
	color: string;
	onClick?: () => void;
}

export default function ColorCircle({ color, onClick }: ColorCircleProps) {
	let colorHex: string;

	switch (color) {
		case "Branco":
			colorHex = "#FFFFFF";
			break;
		case "Vinho":
			colorHex = "#5E2129";
			break;
		default:
			colorHex = "transparent";
			break;
	}

	return (
		<div
			className={styles.container}
			onClick={onClick}
			style={{ backgroundColor: colorHex }}
		/>
	);
}
