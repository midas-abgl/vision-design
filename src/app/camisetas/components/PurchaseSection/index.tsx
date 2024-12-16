"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import { Handbag } from "@phosphor-icons/react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { ClientModal, PurchaseModal } from "./components";

export function PurchaseSection() {
	const [order, setOrder] = useQueryState("pedido", { history: "push" });
	const { isOpen, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: !!order,
		onClose: () => setOrder(null),
	});

	useEffect(() => {
		if (order) {
			onOpen();
		}
	}, [onOpen, order]);

	return (
		<>
			<Button
				className="relative rounded-full border-white px-16 py-4 uppercase transition-colors hover:border-highlight hover:bg-highlight hover:text-black [&>svg]:hover:text-black"
				variant="bordered"
				onClick={onOpen}
			>
				Comprar{" "}
				<Handbag className="absolute right-[calc(24px_/_3_*_2)] text-highlight transition-colors" size={24} />
			</Button>

			{!order ? (
				<ClientModal isOpen={isOpen} onOpenChange={onOpenChange} />
			) : (
				<PurchaseModal isOpen={isOpen} onOpenChange={onOpenChange} />
			)}
		</>
	);
}
