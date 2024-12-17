import { Left, Pages, Right } from "./components";

export function Header() {
	return (
		<header className="flex w-full items-center justify-between">
			<Left />

			<Pages />

			<Right />
		</header>
	);
}
