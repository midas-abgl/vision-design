"use client";
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
import { useEffect, useState } from "react";

export function TermsModal({ isOpen, onOpenChange }: ModalProps) {
	const [, setTermsAccepted] = useQueryState("termo_aceito", { history: "push" });
	const [order, setOrder] = useQueryState("pedido", { history: "push" });

	const [term, setTerm] = useState({ id: "", text: "" });

	useEffect(() => {
		const execute = async () => {
			const currentTerm = await useApi<LegalTerms>("GET", "/terms");

			setTerm(currentTerm);
		};

		execute();
	}, []);

	const acceptTerms = async (acceptance: boolean) => {
		try {
			await useApi<string>("PATCH", `/orders/${order}`, {
				termAccepted: acceptance ? term.id : null,
			});

			if (acceptance) {
				setTermsAccepted("Sim");
			}
		} catch {}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>Informe seus dados</ModalHeader>

				<ModalBody className="w-full">
					<Textarea className="normal-case" value={term.text.replaceAll("\\n", "<br /><br />")} isReadOnly />
					{/* <span
						className="max-h-64 normal-case bg-default-100 px-4 py-2 rounded-xl overflow-auto"
						dangerouslySetInnerHTML={{ __html: term.text.replaceAll("\\n", "<br /><br />") }}
					/> */}

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
