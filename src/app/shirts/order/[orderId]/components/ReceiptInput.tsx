"use client";
import { postApi } from "@utils";
import { useParams, useRouter } from "next/navigation";
import { type ChangeEvent, useRef } from "react";
import styles from "../styles.module.scss";

export interface ReceiptInputProps {
	receipt?: string;
}

export function ReceiptInput({ receipt }: ReceiptInputProps) {
	const { orderId } = useParams();
	const { refresh } = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	async function uploadReceipt(e: ChangeEvent<HTMLInputElement>) {
		const formData = new FormData();
		formData.append("orderId", orderId as string);
		formData.append("receipt", e.target.files![0]);

		await postApi("/shirts/orders/send-receipt", formData);
		refresh();
	}

	return (
		<div
			className={styles.receiptInput}
			onClick={() => fileInputRef.current?.click()}
			style={{ cursor: receipt ? "default" : "pointer" }}
		>
			{receipt ? (
				<span>Comprovante já enviado</span>
			) : (
				<>
					<input ref={fileInputRef} type="file" accept=".png, .jpg, .jpeg, .pdf" onChange={uploadReceipt} />

					<span>Clique aqui para enviar o comprovante de pagamento</span>
				</>
			)}
		</div>
	);
}
