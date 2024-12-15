import { Image } from "@nextui-org/react";

export interface ShirtImageProps {
	className?: string;
	filename: string;
	model: string;
	modelId: string;
}

export function ShirtImage({ className, filename, model, modelId }: ShirtImageProps) {
	return (
		<Image
			className={className}
			classNames={{ wrapper: "overflow-hidden h-full rounded-[4rem]" }}
			alt={model}
			title={model}
			src={`${process.env.NEXT_PUBLIC_CDN_URL}/shirts/${modelId}/photos/${filename}`}
			style={{
				...(model.includes("CI/UFPB") ? { scale: 1.2 } : {}),
			}}
		/>
	);
}
