"use client";
import { Card, CardBody, Image, Select, SelectItem } from "@nextui-org/react";
import { parseAsString, useQueryStates } from "nuqs";

export interface ShirtSelectionProps {
	models: ShirtListing;
}

export function ShirtSelection({ models }: ShirtSelectionProps) {
	const [{ cor: selectedColor, modelo: selectedModel }, setParams] = useQueryStates(
		{
			baby_look: parseAsString,
			cor: parseAsString,
			modelo: parseAsString,
			tamanho: parseAsString,
		},
		{ history: "push" },
	);

	if (!selectedModel) setParams({ modelo: Object.keys(models)[0] });

	const currentShirt = models[selectedModel!];

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
					<SelectItem key={id}>{shirt.model}</SelectItem>
				))}
			</Select>

			<Card className="rounded-[4rem]">
				<CardBody className="items-center gap-4">
					<Image
						classNames={{ img: "w-[65vw] md:w-[30rem] aspect-[1/1.05]" }}
						alt={currentShirt.model}
						title={currentShirt.model}
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/shirts/${selectedModel || Object.keys(models)[0]}/photos/${
							currentShirt.photos[
								Math.max(
									currentShirt.colors.findIndex(color => color === selectedColor),
									0,
								)
							]
						}`}
					/>
				</CardBody>
			</Card>
		</div>
	);
}
