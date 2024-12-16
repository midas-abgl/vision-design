"use client";
import {
	Chip,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import type { UseQueryStateReturn } from "nuqs";
import type { CSSProperties, ReactNode } from "react";

export interface SizeSectionProps {
	backgrounds?: string[][];
	columns?: number;
	data: string[];
	icon?: ReactNode;
	modalContent?: ReactNode;
	state: UseQueryStateReturn<string, undefined>;
	text?: boolean;
	title: string;
	titleCentered?: boolean;
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
	titleCentered = false,
	tooltips,
}: SizeSectionProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<section className={`flex flex-col ${titleCentered ? "items-center" : ""} gap-4`}>
				<div className="flex h-8 items-center gap-2">
					<span className="font-semibold text-lg">{title}</span>

					{icon && (
						<button type="button" onClick={onOpen}>
							{icon}
						</button>
					)}
				</div>

				<div
					className="grid gap-4"
					style={{
						gridTemplateColumns: `repeat(${columns || Math.ceil(data.length / 2)}, 1fr)`,
					}}
				>
					{data.map((each, i) => {
						const current = state === each;
						const styles: CSSProperties = {};

						if (current) {
							styles.color = "#32e6f9";

							if (backgrounds?.[i][0] === "#ffffff") {
								styles.borderColor = "#2ccbdc";
							} else {
								styles.borderColor = "#32e6f9";
							}

							if (text) {
								styles.backgroundColor = "transparent";
							}
						} else {
							styles.borderColor = "transparent";
						}

						if (text) {
							if (!current) {
								styles.backgroundColor = "#d9d9d988";
							}
						} else {
							if (backgrounds) {
								if (backgrounds[i].length > 1) {
									styles.background = `radial-gradient(circle, ${backgrounds![i][1]} 40%, ${backgrounds![i][0]} 41%)`;
								} else {
									styles.backgroundColor = backgrounds![i][0];
								}
							}
						}

						return (
							<button key={each} type="button" onClick={() => setState(each)}>
								<Chip
									classNames={{
										base: "w-full h-10 aspect-[40/33] p-0 border-2",
										content: "box-content text-center m-[-2px] p-0",
									}}
									title={tooltips?.[i]}
									variant="bordered"
									radius="sm"
									style={styles}
								>
									{!text ? "" : each}
								</Chip>
							</button>
						);
					})}
				</div>
			</section>

			{modalContent && (
				<Modal className="max-w-[62rem]" isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						<ModalHeader />

						<ModalBody>{modalContent}</ModalBody>

						<ModalFooter />
					</ModalContent>
				</Modal>
			)}
		</>
	);
}
