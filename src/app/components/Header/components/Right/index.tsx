"use client";
import { Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { ContactModal } from "./components";

const modals = {
	contact: ContactModal,
};

type Modals = keyof typeof modals;

const renderModal = (type: Modals, props: Omit<ModalProps, "onClose">) => {
	const Modal = modals[type];

	return <Modal {...props} />;
};

export function Right() {
	const [modal, setModal] = useState<Modals | null>(null);

	return (
		<>
			<section>
				<Popover placement="bottom-end" style={{ zIndex: 10 }}>
					<PopoverTrigger>
						<button className="px-4 py-4" type="button">
							<Image src="/images/three_dots.png" alt="Opções" width={8} height={20} />
						</button>
					</PopoverTrigger>

					<PopoverContent>
						<Listbox>
							<ListboxItem onPress={() => setModal("contact")}>Contatos</ListboxItem>
						</Listbox>
					</PopoverContent>
				</Popover>
			</section>

			{modal && renderModal(modal, { isOpen: !!modal, onOpenChange: () => setModal(null) })}
		</>
	);
}
