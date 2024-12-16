import Image from "next/image";
import Link from "next/link";

export function Pages() {
	return (
		<nav className="flex">
			<Link className="flex flex-col items-center justify-around gap-2 px-3 py-2" href="/camisetas">
				<Image src="/images/shirt.png" alt="" width={32} height={24} />

				<span className="!normal-case !font-normal text-xs">Camisetas</span>
			</Link>
		</nav>
	);
}
