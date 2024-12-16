"use client";
import { EmblaCarousel } from "@components";
import { Card, CardBody, Image, Select, SelectItem } from "@nextui-org/react";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { ShirtImage } from "./components";

export interface ShirtSelectionProps {
	models: ShirtListing;
}

export function ShirtSelection({ models }: ShirtSelectionProps) {
	const defaultModel = Object.keys(models)[0];

	const [order] = useQueryState("pedido");
	const [{ cor: selectedColor, modelo: selectedModel }, setParams] = useQueryStates(
		{
			baby_look: parseAsString,
			cor: parseAsString,
			modelo: parseAsString,
			tamanho: parseAsString,
		},
		{ history: "push" },
	);

	if (!selectedModel && !order) setParams({ modelo: defaultModel });

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
					base: "w-[20rem]",
					innerWrapper: "justify-center",
					label: "flex justify-center items-center gap-1 w-full h-6 pointer-events-auto",
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
				<CardBody className="relative aspect-[1/1.05] w-[65vw] items-center gap-4 overflow-hidden rounded-[4rem] bg-[url('/images/shirt_card_fx.png')] bg-cover p-4 md:w-[30rem]">
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

				<div className="absolute right-[-2rem] bottom-[-2rem] flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#575757] text-[0.625rem] uppercase">
					<span>Algodão</span>
					<span>F3.1 - 100%</span>
				</div>
			</Card>
		</div>
	);
}
