"use client";
import { Card, CardBody, Image, Select, SelectItem } from "@nextui-org/react";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { ShirtImage } from "./components";
import EmblaCarousel from "components/EmblaCarousel";

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

			<Card className="rounded-[4rem]">
				<CardBody className="items-center gap-4 overflow-hidden aspect-[1/1.05] w-[65vw] md:w-[30rem]">
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
			</Card>
		</div>
	);
}
