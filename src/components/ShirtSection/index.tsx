"use clien";
import { Chip, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import type { UseQueryStateReturn } from "nuqs";
import type { ReactNode } from "react";

export interface SizeSectionProps {
	backgrounds?: string[][];
	columns?: number;
	data: string[];
	icon?: ReactNode;
	modalContent?: ReactNode;
	state: UseQueryStateReturn<string, undefined>;
	text?: boolean;
	title: string;
	tooltips?: string[];
}

export function ShirtSection({
	backgrounds,
	columns,
	data,
	icon,
	modalContent,
	state: [state, setState],
	text = true,
	title,
	tooltips,
}: SizeSectionProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<section className="flex flex-col items-center gap-4">
				<div className="flex items-center gap-2 h-8">
					<span className="font-semibold text-lg">{title}</span>

					{icon && (
						<button type="button" onClick={onOpen}>
							{icon}
						</button>
					)}
				</div>

				<div
					className="grid gap-4"
					style={{ gridTemplateColumns: `repeat(${columns || Math.ceil(data.length / 2)}, 1fr)` }}
				>
					{data.map((each, i) => (
						<button key={each} type="button" onClick={() => setState(each)}>
							<Chip
								className="w-full h-10 aspect-[40/33] p-0"
								classNames={{
									base: "bg-[#d9d9d988] border-4",
									content: "box-content text-center m-[-2px] p-0",
								}}
								title={tooltips?.[i]}
								variant="bordered"
								radius="sm"
								style={{
									...(state === each
										? {
												borderColor: backgrounds?.[i][0] === "#ffffff" ? "#2ccbdc" : "#32e6f9",
												color: "#32e6f9",
											}
										: {
												borderColor: "transparent",
											}),
									...(!text
										? {
												background:
													backgrounds![i].length > 1
														? `radial-gradient(circle, ${backgrounds![i][1]} 40%, ${backgrounds![i][0]} 41%)`
														: backgrounds![i][0],
											}
										: {}),
								}}
							>
								{!text ? "" : each}
							</Chip>
						</button>
					))}
				</div>
			</section>

			{modalContent && (
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						<ModalHeader />

						<ModalBody>{modalContent}</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</>
	);
}
