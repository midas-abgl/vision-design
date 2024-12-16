import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export function PaymentModal({ isOpen, onOpenChange }: ModalProps) {
	const submitReceipt = () => {};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>Forma de pagamento</ModalHeader>

				<ModalBody className="w-full">
					<span>Forma de pagamento</span>
				</ModalBody>

				<ModalFooter className="w-full justify-center">
					<Button type="submit" variant="bordered" onClick={submitReceipt}>
						Enviar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
