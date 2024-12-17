"use client";
import { EmblaCarousel } from "@components";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { useEffect } from "react";
import { ShirtImage } from "./components";

export interface ShirtSelectionProps {
	models: ShirtListing;
}

export function ShirtSelection({ models }: ShirtSelectionProps) {
	const defaultModel = Object.keys(models)[0];

	const [order] = useQueryState("pedido");
	const [{ cor: selectedColor, modelo: selectedModel }, setParams] = useQueryStates({
		baby_look: parseAsString,
		cor: parseAsString,
		modelo: parseAsString,
		tamanho: parseAsString,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional
	useEffect(() => {
		if (!selectedModel && !order) {
			setParams({ modelo: defaultModel });
		}
	}, [defaultModel, order, setParams]);

	const { colors, model, photos } = models[selectedModel || defaultModel];

	const photo =
		photos[
			Math.max(
				colors.findIndex(color => color === selectedColor),
				0,
			)
		];

	return (
		<div className="flex flex-col items-center gap-4">
			<Select
				classNames={{
					base: "w-[20rem] h-full !mt-0",
					innerWrapper: "justify-center",
					label:
						"flex justify-center relative items-center gap-1 w-full max-md:!translate-y-0 mb-2 h-6 pointer-events-auto",
					value: "w-auto",
				}}
				label={<span className="text-[1rem]">Modelo</span>}
				labelPlacement="outside"
				selectedKeys={[selectedModel!]}
				onChange={e =>
					setParams({
						cor: null,
						modelo: e.target.value,
					})
				}
			>
				{Object.entries(models).map(([id, shirt]) => (
					<SelectItem className="h-full" key={id}>
						{shirt.model}
					</SelectItem>
				))}
			</Select>

			<Card className="!overflow-visible relative rounded-[4rem] bg-[length:102%] bg-[url('/images/shirt_card_bg.png')] p-3 backdrop-blur-2xl">
				<CardBody className="relative aspect-[1/1.05] w-full items-center gap-4 overflow-hidden rounded-[4rem] bg-[url('/images/shirt_card_fx.png')] bg-cover p-4 lg:w-[30rem]">
					<EmblaCarousel>
						<ShirtImage
							model={model}
							modelId={selectedModel || defaultModel}
							filename={photo.split(".").join("_f.")}
						/>
						<ShirtImage
							model={model}
							modelId={selectedModel || defaultModel}
							filename={photo.split(".").join("_v.")}
						/>
					</EmblaCarousel>
				</CardBody>

				<div className="lg:-right-8 lg:-bottom-8 -bottom-4 -right-4 absolute flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#575757] text-[0.625rem] uppercase lg:h-28 lg:w-28">
					<span>Algodão</span>
					<span>F3.1 - 100%</span>
				</div>
			</Card>
		</div>
	);
}
