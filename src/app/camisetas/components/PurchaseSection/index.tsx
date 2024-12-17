"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import { Handbag } from "@phosphor-icons/react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ClientModal, PaymentModal, TermsModal } from "./components";

export interface PurchaseSectionProps {
	models: ShirtListing;
}

export function PurchaseSection({ models }: PurchaseSectionProps) {
	const [model] = useQueryState("modelo");
	const [order, setOrder] = useQueryState("pedido", { history: "push" });
	const [orderStatus, setOrderStatus] = useQueryState("status");
	const [termsAccepted] = useQueryState("termo_aceito");

	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: !!order,
		onClose: async () => {
			setOrder(null);
		},
	});

	useEffect(() => {
		if (orderStatus === "successo") {
			toast("Compra realizada com sucesso!", { toastId: "order-success", type: "success" });
			setOrderStatus(null);
		}
	}, [orderStatus, setOrderStatus]);

	const props = { isOpen, onClose, onOpenChange };

	return (
		<>
			<Button
				className="relative rounded-full border-white px-16 py-4 uppercase transition-colors hover:border-highlight hover:bg-highlight hover:text-black [&>svg]:hover:text-black"
				variant="bordered"
				onPress={onOpen}
			>
				Comprar
				<Handbag className="absolute right-[calc(24px_/_3_*_2)] text-highlight transition-colors" size={24} />
			</Button>

			{!order ? (
				<ClientModal {...props} />
			) : !termsAccepted ? (
				<TermsModal {...props} />
			) : (
				<PaymentModal model={models[model!].model} {...props} />
			)}
		</>
	);
}
