"use client";
import { Modal } from "@hyoretsu/react-components";
import type { Prisma } from "@prisma/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "../styles.module.scss";

type ClientData = Prisma.ClientCreateInput;

export default function PurchaseButton() {
	const { shirtId } = useParams();
	const { push } = useRouter();
	const searchParams = useSearchParams();
	const [clientData, setClientData] = useState<ClientData>({} as ClientData);
	const [modalShown, showModal] = useState(false);

	return (
		<>
			<button type="submit" onClick={() => showModal(true)}>
				Comprar
			</button>

			{modalShown && (
				<Modal
					className={styles.purchaseModal}
					onConfirm={async () => {
						if (!clientData.email || !clientData.name || !clientData.phoneNumber) {
							return;
						}

						const order = await (
							await fetch("/api/shirts/orders", {
								method: "POST",
								body: JSON.stringify({
									client: clientData,
									color: searchParams.get("color")!,
									modelId: shirtId,
									size: searchParams.get("size")!,
								}),
								headers: {
									"Content-Type": "application/json",
								},
							})
						).json();

						push(`/shirts/order/${order.id}`);
					}}
				>
					<div>
						<label htmlFor="name">Nome</label>
						<input name="name" onChange={e => setClientData(old => ({ ...old, name: e.target.value }))} />
					</div>

					<div>
						<label htmlFor="email">Email</label>
						<input name="email" onChange={e => setClientData(old => ({ ...old, email: e.target.value }))} />
					</div>

					<div>
						<label htmlFor="phoneNumber">Celular</label>
						<input
							name="phoneNumber"
							onChange={e => setClientData(old => ({ ...old, phoneNumber: e.target.value }))}
						/>
					</div>
				</Modal>
			)}
		</>
	);
}
