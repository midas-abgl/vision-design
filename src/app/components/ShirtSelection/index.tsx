"use client";
import { Card, CardBody, Image, Select, SelectItem } from "@nextui-org/react";
import { parseAsString, useQueryStates } from "nuqs";
import { ColorSelection } from "..";

export interface ShirtSelectionProps {
	models: ShirtListing;
}

export function ShirtSelection({ models }: ShirtSelectionProps) {
	const [{ cor: selectedColor, modelo: selectedModel }, setParams] = useQueryStates(
		{
			baby_look: parseAsString,
			cor: parseAsString,
			modelo: parseAsString.withDefault(Object.keys(models)[0]),
			tamanho: parseAsString,
		},
		{ history: "push" },
	);

	const currentShirt = models[selectedModel] || Object.values(models)[0];

	return (
		<>
			<Select
				classNames={{
					base: "w-[20rem]",
					innerWrapper: "justify-center",
					label: "flex justify-center items-center gap-1 w-full h-6 pointer-events-auto",
					value: "w-auto",
				}}
				label={<span className="text-[1rem]">Modelo</span>}
				labelPlacement="outside"
				selectedKeys={[selectedModel]}
				onChange={e =>
					setParams({
						baby_look: null,
						cor: null,
						modelo: e.target.value,
						tamanho: null,
					})
				}
			>
				{Object.entries(models).map(([id, shirt]) => (
					<SelectItem key={id}>{shirt.model}</SelectItem>
				))}
			</Select>

			<Card>
				<CardBody className="items-center gap-4">
					<Image
						classNames={{ img: "w-[65vw] md:w-[25rem] h-[20vh]" }}
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

					<ColorSelection colors={currentShirt.colors} />
				</CardBody>
			</Card>
		</>
	);
}
