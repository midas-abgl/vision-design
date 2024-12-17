"use client";
import team from "@app/contact.json";
import { useAppStore } from "@context/store";
import { sendMail } from "@lib/mail";
import { useShallow } from "@lib/storage";
import { Button, useDisclosure } from "@nextui-org/react";
import { Handbag } from "@phosphor-icons/react";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ClientModal, PaymentModal, TermsModal } from "./components";

export interface PurchaseSectionProps {
	models: ShirtListing;
}

export function PurchaseSection({ models }: PurchaseSectionProps) {
	const { email, terms } = useAppStore(
		useShallow(state => ({
			email: state.client.email,
			terms: state.terms.text,
		})),
	);
	const [shirtData] = useQueryStates({
		baby_look: parseAsString,
		cor: parseAsString,
		modelo: parseAsString,
		tamanho: parseAsString,
	});
	const [order, setOrder] = useQueryState("pedido", { history: "push" });
	const [orderStatus, setOrderStatus] = useQueryState("status");
	const [termsAccepted] = useQueryState("termo_aceito");

	const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure({
		defaultOpen: !!order,
		onClose: async () => {
			setOrder(null);
			await sendMail({
				body: `Olá! Ficamos felizes que você escolheu comprar conosco.\n\nAqui estão os detalhes da sua compra:\n[Identificador] ${order}\n[Estampa] ${models[shirtData.modelo!].model}\n[Cor] ${shirtData.cor}\n[Tamanho] ${shirtData.tamanho}\n[Baby look] ${shirtData.baby_look}\n\nAgora é só aguardar. Iremos enviar mais dois emails, um para avisar quando a remessa for enviada e outro quando ela for recebida.\n\n--------------------------------------------------\n\nPara fins de recordação, segue os termos que foram concordados no ato do pedido.\n\n${terms}\n\n--------------------------------------------------\n\nContato:\n${Object.entries(
					team,
				)
					.map(([member, { Celular }]) => `${member}: ${Celular}`)
					.join("\n")}`,
				subject: "[Vision Design] Comprovante de pedido",
				to: email,
			});
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
				<PaymentModal {...props} />
			)}
		</>
	);
}
