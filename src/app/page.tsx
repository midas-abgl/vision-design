import { getApi } from "@utils";
import ShirtTile from "./components/ShirtTile";
import styles from "./styles.module.scss";

export default async function Home() {
	const models = await getApi<Shirt[]>("/shirts");

	return (
		<div className={styles.container}>
			{models.map(shirt => (
				<ShirtTile key={shirt.id} shirt={shirt} />
			))}
		</div>
	);
}
