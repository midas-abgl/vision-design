"use client";
import { useQueryState } from "nuqs";
import { PaymentModal } from "./PaymentModal";
import { TermsModal } from "./TermsModal";

export function PurchaseModal(props: ModalProps) {
	const [termsAccepted] = useQueryState("termo_aceito");

	if (!termsAccepted) {
		return <TermsModal {...props} />;
	}

	return <PaymentModal {...props} />;
}
