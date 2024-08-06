import ColorCircle from "@components/ColorCircle";
import prisma from "@database";
import { Link } from "@hyoretsu/react-components";
import Image from "next/image";
import styles from "./styles.module.scss";

export default async function Home() {
	const shirtModels = await prisma.shirt.findMany();

	return (
		<div className={styles.container}>
			{shirtModels.map(({ colors, id, model, photos, prices }) => (
				<div key={id} className={styles.shirtTile}>
					<Image alt={`Camiseta ${model}`} src={photos[0]} width={230} height={344} />

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
			))}
		</div>
	);
}
