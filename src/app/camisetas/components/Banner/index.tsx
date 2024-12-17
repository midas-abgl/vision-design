export function Banner({ className }: WithClassName) {
	return (
		<div
			className={`flex flex-col items-center self-center text-center text-3xl uppercase lg:text-4xl ${className}`}
		>
			<h1 className="!tracking-[0.375rem]">Camisetas personalizadas</h1>
			<h2 className="!font-light !tracking-[2rem] -mr-8 hidden text-xl lg:block">Faça seu estilo</h2>
		</div>
	);
}
