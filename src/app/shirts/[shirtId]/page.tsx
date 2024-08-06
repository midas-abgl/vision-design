import prisma from "@database";
import { notFound } from "next/navigation";
import { PhotoSlideshow, Pricing, PurchaseOptions, SizeTable } from "./components";
import styles from "./styles.module.scss";

export interface ShirtPageProps {
	params: {
		shirtId: string;
	};
}

export default async function ShirtPage({ params }: ShirtPageProps) {
	const shirt = await prisma.shirt.findUnique({ where: { id: params.shirtId } });
	if (!shirt) {
		notFound();
	}

	const { colors, model, prices, photos } = shirt;

	return (
		<div className={styles.container}>
			<PhotoSlideshow photos={photos} />

			<section className={styles.shirtInfo}>
				<div>
					<h4>Camiseta</h4>
					<h2>{model}</h2>
				</div>

				<PurchaseOptions colors={colors} />

				<SizeTable />

				<Pricing prices={prices} />

				<button type="button">Comprar</button>
			</section>
		</div>
	);
}
