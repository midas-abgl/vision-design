"use client";
import {
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";
import { parseAsString, useQueryState } from "nuqs";
import { PiQuestion, PiQuestionMarkLight, PiQuestionThin } from "react-icons/pi";

export function SizeSelection() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [babyLook, setBabyLook] = useQueryState(
		"baby_look",
		parseAsString.withDefault("Nao").withOptions({ history: "push" }),
	);
	const [size, setSize] = useQueryState(
		"tamanho",
		parseAsString.withDefault("M").withOptions({ history: "push" }),
	);

	return (
		<div className="flex flex-col gap-4">
			<Select
				classNames={{
					base: "w-[8rem]",
					innerWrapper: "justify-center",
					label: "flex items-center gap-1 w-full h-6 text-[1rem] pointer-events-auto",
					value: "w-auto",
				}}
				label="Baby look?"
				labelPlacement="outside"
				selectedKeys={[babyLook]}
				onChange={e => {
					const baby_look = e.target.value;
					setBabyLook(baby_look);

					if (baby_look === "Sim" && size === "PP") {
						setSize("P");
					}
				}}
			>
				<SelectItem key="Nao">Não</SelectItem>
				<SelectItem key="Sim">Sim</SelectItem>
			</Select>

			<Select
				classNames={{
					base: "w-[8rem]",
					innerWrapper: "justify-center",
					label: "flex justify-center items-center gap-1 h-6 text-[1rem] pointer-events-auto",
					value: "w-auto",
				}}
				label={
					<>
						<span>Tamanho</span>

						<button type="button" onClick={onOpen}>
							<PiQuestion className="w-5 h-5" />
						</button>
					</>
				}
				labelPlacement="outside"
				selectedKeys={[size]}
				onChange={e => setSize(e.target.value)}
			>
				{babyLook === "Sim" ? <SelectItem key="PP">PP</SelectItem> : <></>}
				<SelectItem key="P">P</SelectItem>
				<SelectItem key="M">M</SelectItem>
				<SelectItem key="G">G</SelectItem>
				<SelectItem key="GG">GG</SelectItem>
				<SelectItem key="XGG">XGG</SelectItem>
			</Select>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader />

					<ModalBody>
						<Image
							alt="Tabela de tamanhos"
							title="Tabela de tamanhos"
							src={`${process.env.NEXT_PUBLIC_CDN_URL}/shirts/size_table.jpg`}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}
