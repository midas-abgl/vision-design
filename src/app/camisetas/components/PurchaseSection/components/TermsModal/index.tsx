"use client";
import { useAppStore } from "@context/store";
import { useShallow } from "@lib/storage";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
} from "@nextui-org/react";
import { useApi } from "@utils";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export function TermsModal({ isOpen, onClose, onOpenChange }: ModalProps) {
	const [, setTermsAccepted] = useQueryState("termo_aceito");
	const [order] = useQueryState("pedido");

	const [terms, setTerms] = useAppStore(useShallow(state => [state.terms, state.setTerms]));

	useEffect(() => {
		const execute = async () => {
			const { id, text } = await useApi<LegalTerms>("GET", "/terms");

			setTerms({
				id,
				text: text.replaceAll("\\n", "\n\n"),
			});
		};

		execute();
	}, [setTerms]);

	const acceptTerms = async (acceptance: boolean) => {
		try {
			await useApi<string>("PATCH", `/orders/${order}`, {
				termAccepted: acceptance ? terms.id : null,
			});

			if (acceptance) {
				setTermsAccepted("Sim");
			} else {
				onClose();
			}
		} catch {}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent className="!max-w-none w-[35rem]">
				<ModalHeader>Informe seus dados</ModalHeader>

				<ModalBody className="w-full">
					<Textarea
						className="whitespace-pre-wrap normal-case"
						value={terms.text}
						isReadOnly
						style={{
							height: "20rem",
						}}
					/>

					<span className="text-center normal-case">
						Ao clicar em "Aceitar", o comprador reconhece e concorda com os termos estabelecidos acima.
					</span>
				</ModalBody>

				<ModalFooter className="w-full justify-center">
					<Button variant="bordered" onClick={() => acceptTerms(false)}>
						Recusar
					</Button>
					<Button variant="bordered" onClick={() => acceptTerms(true)}>
						Aceitar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
