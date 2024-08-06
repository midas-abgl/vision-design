import prisma from "@database";
import { notFound } from "next/navigation";
import PhotoSlideshow from "./components/PhotoSlideshow";
import styles from "./styles.module.scss";

export interface ShirtPageProps {
	params: {
		shirtId: string;
	};
}

export default async function ShirtPage({ params }: ShirtPageProps) {
	const shirt = await prisma.shirt.findUnique({ where: { id: params.shirtId } });
	if (!shirt) {
		notFound();
	}

	const { photos } = shirt;

	return (
		<div className={styles.container}>
			<PhotoSlideshow photos={photos} />
		</div>
	);
}
