import { useQueryState } from "nuqs";
import { TermsModal } from "./TermsModal";
import { PaymentModal } from "./PaymentModal";

export function PurchaseModal(props: ModalProps) {
	const [termsAccepted] = useQueryState("termo_aceito");

	if (!termsAccepted) {
		return <TermsModal {...props} />;
	}

	return <PaymentModal {...props} />;
}
