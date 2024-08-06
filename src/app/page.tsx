import prisma from "@database";
import ShirtTile from "./components/ShirtTile";
import styles from "./styles.module.scss";

export default async function Home() {
	const shirtModels = await prisma.shirt.findMany();

	return (
		<div className={styles.container}>
			{shirtModels.map(shirt => (
				<ShirtTile key={shirt.id} shirt={shirt} />
			))}
		</div>
	);
}
