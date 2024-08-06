import prisma from "@database";
import { sanitizeJson } from "@hyoretsu/utils";
import ShirtTile from "./components/ShirtTile";
import styles from "./styles.module.scss";

export default async function Home() {
	const shirtModels = await prisma.shirt.findMany();

	return (
		<div className={styles.container}>
			{shirtModels.map(model => (
				<ShirtTile key={model.id} shirt={sanitizeJson(model)} />
			))}
		</div>
	);
}
