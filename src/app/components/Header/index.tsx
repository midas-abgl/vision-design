import { Left, Pages, Right } from "./components";

export function Header() {
	return (
		<header className="flex items-center justify-between">
			<Left />

			<Pages />

			<Right />
		</header>
	);
}
