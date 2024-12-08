"use client";
import {
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { postApi } from "@utils";
import { parseAsString, useQueryStates } from "nuqs";
import { useRef } from "react";

export function PurchaseSection() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [{ cor: color, modelo: modelId, tamanho: size }, setParams] = useQueryStates({
		baby_look: parseAsString,
		cor: parseAsString,
		modelo: parseAsString,
		pedido: parseAsString,
		tamanho: parseAsString,
	});

	return (
		<>
			<Button onClick={onOpen}>Comprar</Button>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>Informe seus dados</ModalHeader>

					<Form
						onSubmit={async e => {
							e.preventDefault();

							const data = Object.fromEntries(new FormData(e.currentTarget));

							const pedido = await postApi<string>("/orders", {
								client: data,
								color,
								modelId,
								payment: 52,
								size,
							});

							setParams({
								baby_look: null,
								cor: null,
								modelo: null,
								pedido,
								tamanho: null,
							});
						}}
					>
						<ModalBody className="w-full [&_input]:normal-case">
							<Input label="Nome" name="name" isRequired />
							<Input label="Email" name="email" type="email" isRequired />
							<Input label="Celular" name="phoneNumber" isRequired />
						</ModalBody>

						<ModalFooter className="justify-center w-full">
							<Button type="submit" variant="bordered">
								Comprar
							</Button>
						</ModalFooter>
					</Form>
				</ModalContent>
			</Modal>
		</>
	);
}
