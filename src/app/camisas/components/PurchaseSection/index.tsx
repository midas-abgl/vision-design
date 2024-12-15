"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import { ClientModal, PurchaseModal } from "./components";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

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
			<Button onClick={onOpen}>Comprar</Button>

			{!order ? (
				<ClientModal isOpen={isOpen} onOpenChange={onOpenChange} />
			) : (
				<PurchaseModal isOpen={isOpen} onOpenChange={onOpenChange} />
			)}
		</>
	);
}
