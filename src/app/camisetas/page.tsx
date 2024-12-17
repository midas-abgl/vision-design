import { useApi } from "@utils";
import {
	Banner,
	ColorSelection,
	PriceSection,
	PurchaseSection,
	ShirtSelection,
	SizeSelection,
} from "./components";

export default async function Home() {
	const models = await useApi<ShirtListing>("GET", "/shirts");

	return (
		<main className="flex flex-col">
			<Banner className="my-12 lg:mt-24 lg:mb-32" />

			<div className="flex flex-col justify-center gap-20 lg:flex-row lg:gap-36">
				<ShirtSelection models={models} />

				<section className="flex flex-col justify-center gap-8">
					<ColorSelection models={models} />

					<SizeSelection />

					<div className="flex flex-col items-center gap-4">
						<PriceSection models={models} />

						<PurchaseSection models={models} />
					</div>
				</section>
			</div>
		</main>
	);
}
