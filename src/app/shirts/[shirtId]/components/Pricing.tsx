"use client";
import { Modal } from "@hyoretsu/react-components";
import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import styles from "../styles.module.scss";

export interface PricingProps {
	prices: number[];
}

export function Pricing({ prices }: PricingProps) {
	const [modalShown, showModal] = useState(false);

	return (
		<>
			<div className={styles.pricing}>
				<h3>Preço base:</h3>
				<span>
					R${prices[0].toLocaleString()}
					<button type="button" onClick={() => showModal(true)}>
						<BiInfoCircle />
					</button>
				</span>
			</div>

			{modalShown && (
				<Modal onConfirm={() => showModal(false)}>
					<span>Por quê "preço-base"?</span>
					<span>
						Esse é o preço normal de venda das camisas, mas caso muitas pessoas comprem é possível abaixar o
						preço devido ao volume.
					</span>
					<span>10-40: R${prices[0].toLocaleString()}</span>
					<span>40+ pessoas: R$42,99</span>
				</Modal>
			)}
		</>
	);
}
