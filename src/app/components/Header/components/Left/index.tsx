import Image from "next/image";
import Link from "next/link";

export function Left() {
	return (
		<section>
			<Link href="/">
				<Image src="/images/logo.png" alt="Logo da Vision Design" width={84} height={60} />
			</Link>
		</section>
	);
}
