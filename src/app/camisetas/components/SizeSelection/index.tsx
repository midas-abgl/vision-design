"use client";
import { ShirtSection } from "@components";
import { Image } from "@nextui-org/react";
import { Question } from "@phosphor-icons/react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

const babySizes = ["PP", "P", "M", "G", "GG", "XGG"];
const sizes = ["P", "M", "G", "GG", "XGG"];

const defaultValues = {
	babyLook: "Não",
	size: "M",
};

export function SizeSelection() {
	const [babyLook, setBabyLook] = useQueryState("baby_look");
	const [order] = useQueryState("pedido");
	const [size, setSize] = useQueryState("tamanho");

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional
	useEffect(() => {
		if (!size && !order) {
			setSize(defaultValues.size);
		}

		if (!babyLook && !order) {
			setBabyLook(defaultValues.babyLook);
		}
	}, [order, setBabyLook, setSize]);

	return (
		<div className="flex gap-8">
			<ShirtSection
				title="Tamanho"
				icon={<Question className="h-8 w-8 text-highlight" />}
				data={babyLook === "Sim" ? babySizes : sizes}
				state={[size, setSize]}
				modalContent={
					<Image
						className="w-full"
						alt="Tabela de tamanhos"
						title="Tabela de tamanhos"
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/shirts/size_table.jpg`}
					/>
				}
			/>

			<ShirtSection title="Baby Look?" data={["Sim", "Não"]} columns={2} state={[babyLook, setBabyLook]} />
		</div>
	);
}
