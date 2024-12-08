"use client";
import { ShirtSection } from "@components";
import { Image } from "@nextui-org/react";
import { useQueryState } from "nuqs";
import { PiQuestion } from "react-icons/pi";

const babySizes = ["PP", "P", "M", "G", "GG", "XGG"];
const sizes = ["P", "M", "G", "GG", "XGG"];

export function SizeSelection() {
	const [babyLook, setBabyLook] = useQueryState("baby_look", { history: "push" });
	const [size, setSize] = useQueryState("tamanho", { history: "push" });

	if (!babyLook) setBabyLook("Não");
	if (!size) setSize("M");

	return (
		<div className="flex gap-4">
			<ShirtSection
				title="Tamanho"
				icon={<PiQuestion className="w-8 h-8 text-highlight" />}
				data={babyLook === "Sim" ? babySizes : sizes}
				state={[size, setSize]}
				modalContent={
					<Image
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
