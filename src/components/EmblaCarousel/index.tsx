"use client";
import useEmblaCarousel from "embla-carousel-react";
import type { ReactNode } from "react";
import { NextButton, PrevButton } from "./components";

export interface EmblaCarouselProps {
	children: ReactNode[];
	className?: string;
}

export function EmblaCarousel({ children, className }: EmblaCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel();

	return (
		<div className={`embla ${className || ""}`}>
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{children.map((child, i) => (
						<div key={i} className="embla__slide">
							{child}
						</div>
					))}
				</div>

				<div className="embla__controls opacity-100">
					<div className="embla__buttons">
						<PrevButton api={emblaApi!} />
						<NextButton api={emblaApi!} />
					</div>
				</div>
			</div>
		</div>
	);
}
