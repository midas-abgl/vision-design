import ColorCircle from "@components/ColorCircle";
import { Link } from "@hyoretsu/react-components";
import type { Shirt } from "@types";
import Image from "next/image";
import styles from "../styles.module.scss";

export interface ShirtTileProps {
	shirt: Shirt;
}

export default function ShirtTile({ shirt }: ShirtTileProps) {
	const { colors, id, model, photos, prices } = shirt;

	return (
		<div key={shirt.id} className={styles.shirtTile}>
			<Image alt="" src={photos[0]} width={230} height={286} />

			<h4>{model}</h4>

			<p>
				A partir de:
				<br />
				<b>R${prices[0].toLocaleString()}</b>
			</p>

			<span>Cores:</span>
			<div className={styles.shirtColors}>
				{colors.map(color => (
					<ColorCircle key={color} color={color} />
				))}
			</div>

			<Link href={`/shirts/${id}`}>
				<button type="button">Comprar</button>
			</Link>
		</div>
	);
}
