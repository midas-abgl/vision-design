"use client";
import { Modal } from "@hyoretsu/react-components";
import { useState } from "react";

export function SizeTable() {
	const [modalShown, showModal] = useState(false);

	return (
		<>
			<button type="button" onClick={() => showModal(true)}>
				Tabela de tamanhos
			</button>

			{modalShown && <Modal onConfirm={() => showModal(false)}>Imagem</Modal>}
		</>
	);
}
