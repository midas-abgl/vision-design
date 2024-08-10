import { getApi } from "@utils";
import Image from "next/image";
import { createStaticPix, hasError } from "pix-utils";
import { ReceiptInput } from "./components";
import styles from "./styles.module.scss";

export interface ShirtOrderProps {
	params: {
		orderId: string;
	};
}

export default async function ShirtOrder({ params: { orderId } }: ShirtOrderProps) {
	const order = await getApi<ShirtOrder>(`/shirts/orders?id=${orderId}`);
	const { manufacturingPrice: price } = order.shirt!;

	const pix = createStaticPix({
		infoAdicional: `Pedido ${orderId} (camisa)`,
		merchantCity: "João Pessoa",
		merchantName: "Vision Design",
		pixKey: "46351012000161",
		transactionAmount: price,
	});
	if (hasError(pix)) {
		throw new Error("Erro ao gerar pix.");
	}

	const image = await pix.toImage();

	return (
		<div className={styles.container}>
			<div className={styles.orderInfo}>
				<span>Valor inicial: R${price.toLocaleString()}</span>
				<p>
					Esse valor é um compromisso de compra. Nós já registramos seu interesse e você pode pagá-lo
					posteriormente. Tenha em mente que normalmente fechamos um lote para confecção a cada 2 semanas,
					dado que tenham pedidos suficientes.
				</p>
				<p>
					Cancelamentos são aceitos até essa data, podendo ela ser divulgada previamente aos interessados ou
					não.
				</p>
				<p>
					Quando a confecção das camisas for iniciada, enviaremos um email com o Pix referente ao restante do
					valor. Este outro deve ser pago e seu comprovante enviado através do link fornecido para que você
					possa receber a camisa, podendo ser feito no ato do recebimento.
				</p>
				<br />
				<p>
					Obs: temos um prazo de 1 mês para o recebimento da camisa, dado que já houveram casos de camisas
					abandonadas por mais de 1 ano. Após esse prazo, caso não entre em contato, poderá ser feito um
					saldão das camisas, logo não garantimos sua entrega.
				</p>
			</div>

			<div className={styles.pixInfo}>
				<Image alt="" src={image} width={282} height={282} />

				<span>
					Pix copia e cola:
					<br />
					{pix.toBRCode()}
				</span>
			</div>

			<ReceiptInput receipt={order.receipts[0]} />
		</div>
	);
}
