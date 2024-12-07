import { getApi } from "@utils";
import { ShirtSelection, SizeSelection } from "./components";
import styles from "./styles.module.scss";

export default async function Home() {
	const models = await getApi<ShirtListing>("/shirts");

	return (
		<div className={styles.container}>
			<ShirtSelection models={models} />

			<SizeSelection />
		</div>
	);
}
