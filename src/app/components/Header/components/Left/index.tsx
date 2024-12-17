import Image from "next/image";
import Link from "next/link";

export function Left() {
	return (
		<section>
			<Link href="/">
				<Image
					className="h-[85%]"
					src="/images/logo.png"
					alt="Logo da Vision Design"
					width={70}
					height={50}
				/>
			</Link>
		</section>
	);
}
