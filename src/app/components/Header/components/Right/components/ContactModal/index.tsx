"use client";
import team from "@app/contact.json";
import { Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import type { ReactNode } from "react";

export interface ContactModalProps {
	isOpen: boolean;
	onOpenChange: () => void;
}

export function ContactModal({ isOpen, onOpenChange }: ContactModalProps) {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>
					<span>Contatos</span>
				</ModalHeader>

				<ModalBody>
					{Object.entries(team).map(([name, contactInfo]) => (
						<div key={name} className="[&_*]:!font-normal [&_*]:text-md [&_*]:normal-case">
							<span>{name}</span>

							<ul className="ml-4 list-disc">
								{Object.entries(contactInfo).map(([means, value]) => {
									let valueElem: ReactNode = value;

									if (means === "Celular") {
										valueElem = (
											<Link
												href={`https://api.whatsapp.com/send?phone=55${value.replaceAll(/(?:\(|\)|\s|\-)/g, "")}`}
												target="_blank"
												rel="noopener noreferrer"
											>
												{value}
											</Link>
										);
									}

									return (
										<li key={`${name}_${means}`}>
											{means}: {valueElem}
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</ModalBody>

				<ModalFooter />
			</ModalContent>
		</Modal>
	);
}
