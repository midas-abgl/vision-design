import { getApi } from "@utils";
import { ColorSelection, PurchaseSection, ShirtSelection, SizeSelection } from "./components";

export default async function Home() {
	const models = await getApi<ShirtListing>("/shirts");

	return (
		<div className="flex justify-center gap-36">
			<ShirtSelection models={models} />

			<section className="flex flex-col items-center justify-center gap-4">
				<ColorSelection models={models} />

				<SizeSelection />

				<div className="flex flex-col items-center">
					<span>Preço:</span>
					<span>R$50,00</span>
				</div>

				<PurchaseSection />
			</section>
		</div>
	);
}
