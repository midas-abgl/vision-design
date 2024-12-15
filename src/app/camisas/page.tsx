import { useApi } from "@utils";
import { ColorSelection, PriceSection, PurchaseSection, ShirtSelection, SizeSelection } from "./components";

export default async function Home() {
	const models = await useApi<ShirtListing>("GET", "/shirts");

	return (
		<div className="flex justify-center gap-36">
			<ShirtSelection models={models} />

			<section className="flex flex-col items-center justify-center gap-8">
				<ColorSelection models={models} />

				<SizeSelection />

				<div className="flex flex-col gap-4">
					<PriceSection models={models} />

					<PurchaseSection />
				</div>
			</section>
		</div>
	);
}
