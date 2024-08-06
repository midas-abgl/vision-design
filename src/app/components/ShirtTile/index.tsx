"use client";
import ColorCircle from "@components/ColorCircle";
import type { Shirt } from "@types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.scss";

export interface ShirtTileProps {
	shirt: Shirt;
}

export default function ShirtTile({ shirt: { colors, id, model, photos, prices } }: ShirtTileProps) {
	const { push } = useRouter();
	const [currentColor, setColor] = useState(0);

	return (
		<div key={id} className={styles.container}>
			<Image alt={`Camiseta ${model}`} src={photos[currentColor]} width={230} height={344} />

			<h4>{model}</h4>

			<p>
				A partir de:
				<br />
				<b>R${prices[0].toLocaleString()}</b>
			</p>

			<span>Cores:</span>
			<div className={styles.colors}>
				{colors.map((color, i) => (
					<ColorCircle key={color} color={color} onClick={() => setColor(i)} />
				))}
			</div>

			<button type="button" onClick={() => push(`/shirts/${id}`)}>
				Comprar
			</button>
		</div>
	);
}
