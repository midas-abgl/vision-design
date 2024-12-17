"use client";
import team from "@app/contact.json";
import { useAppStore } from "@context/store";
import { sendMail } from "@lib/mail";
import { useShallow } from "@lib/storage";
import {
	Button,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
} from "@nextui-org/react";
import { Clipboard } from "@phosphor-icons/react";
import { useApi } from "@utils";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { createStaticPix, hasError } from "pix-utils";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

const creditCardLink = "https://pay.infinitepay.io/vision-design/VC1D-uex66ZqVz-51,99";

export interface PaymentModalProps extends ModalProps {
	model: string;
}

export function PaymentModal({ isOpen, model, onClose, onOpenChange }: PaymentModalProps) {
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
	const [orderId] = useQueryState("pedido");
	const [, setOrderStatus] = useQueryState("status");
	const [, setTermsAccepted] = useQueryState("termo_aceito");

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [qrCode, setQrCode] = useState<string>("");
	const [pixCopied, setPixCopied] = useState(false);

	const pix = createStaticPix({
		infoAdicional: `Pedido ${orderId} (camisa)`,
		merchantCity: "João Pessoa",
		merchantName: "Vision Design",
		pixKey: "vision.design.cc@gmail.com",
		transactionAmount: 51.99,
	});

	if (hasError(pix)) {
		throw new Error("Erro ao gerar pix.");
	}

	const brCode = pix.toBRCode();

	useEffect(() => {
		const generateQrCode = async () => {
			setQrCode(await pix.toImage());
		};

		generateQrCode();
	}, [pix.toImage]);

	const submitReceipt = async (e: ChangeEvent<HTMLInputElement>) => {
		const formData = new FormData();
		formData.append("receipt", e.target.files![0]);

		await useApi("POST", `/orders/${orderId}/send-receipt`, formData);

		await sendMail({
			body: `Olá! Ficamos felizes que você escolheu comprar conosco.\n\nAqui estão os detalhes da sua compra:\n[Identificador] ${orderId}\n[Estampa] ${model}\n[Cor] ${shirtData.cor}\n[Tamanho] ${shirtData.tamanho}\n[Baby look] ${shirtData.baby_look}\n\nAgora é só aguardar. Iremos enviar mais dois emails, um para avisar quando a remessa for enviada e outro quando ela for recebida.\n\n--------------------------------------------------\n\nPara fins de recordação, segue os termos que foram concordados no ato do pedido.\n\n${terms}\n\n--------------------------------------------------\n\nContato:\n${Object.entries(
				team,
			)
				.map(([member, { Celular }]) => `${member}: ${Celular}`)
				.join("\n")}`,
			subject: "[Vision Design] Comprovante de pedido",
			to: email,
		});

		setOrderStatus("successo");
		setTermsAccepted(null);
		onClose?.();
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>Forma de pagamento</ModalHeader>

				<ModalBody className="w-full">
					<span>Cartão:</span>
					<Link className="mx-auto" href={creditCardLink} isExternal>
						<Button
							className="block h-full bg-default-100 py-2"
							type="button"
							onPress={() => window.open(creditCardLink, "_blank")}
						>
							<span>
								Em até 12x
								<br />
								(com juros da plataforma)
							</span>
						</Button>
					</Link>

					<span>
						<span className="inline lg:hidden">ou </span>Pix copia e cola:
					</span>
					<div className="relative flex items-start overflow-hidden rounded-lg bg-default-100 p-2">
						<span className="whitespace-nowrap">{brCode}</span>

						<div className="absolute top-0 right-0 flex aspect-square h-full items-center justify-center bg-default-100">
							<Tooltip content="Copiado!" isOpen={pixCopied}>
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(brCode);
										setPixCopied(true);
										setTimeout(() => setPixCopied(false), 2000);
									}}
								>
									<Clipboard size={20} />
								</button>
							</Tooltip>
						</div>
					</div>

					<span className="hidden lg:block">ou QR code:</span>
					{qrCode && <img className="hidden aspect-square w-full lg:block" src={qrCode} alt="" />}
				</ModalBody>

				<ModalFooter className="w-full justify-center">
					<input
						className="hidden"
						ref={fileInputRef}
						type="file"
						accept=".png, .jpg, .jpeg, .pdf"
						onChange={submitReceipt}
					/>

					<Button
						className="flex h-full flex-col border-highlight py-2 text-highlight leading-3"
						type="submit"
						variant="bordered"
						onPress={() => fileInputRef.current?.click()}
					>
						<span>Enviar comprovante</span>
						<span>(imagem, PDF ou print)</span>
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
