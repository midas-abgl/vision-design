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
		<main className="my-24 flex flex-col gap-32">
			<Banner />

			<div className="flex justify-center gap-36">
				<ShirtSelection models={models} />

				<section className="flex flex-col justify-center gap-8">
					<ColorSelection models={models} />

					<SizeSelection />

					<div className="flex flex-col items-center gap-4">
						<PriceSection models={models} />

						<PurchaseSection />
					</div>
				</section>
			</div>
		</main>
	);
}
