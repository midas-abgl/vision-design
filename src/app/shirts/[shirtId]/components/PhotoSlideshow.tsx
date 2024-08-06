"use client";
import Image from "next/image";
import { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import styles from "../styles.module.scss";

export interface PhotoSlideshowProps {
	photos: string[];
}

export default function PhotoSlideshow({ photos }: PhotoSlideshowProps) {
	const [currentPhoto, setCurrentPhoto] = useState(0);

	photos = photos.slice(0, 4);

	return (
		<div className={styles.photoSlideshow}>
			<div>
				{photos.map((photo, index) => (
					<Image
						key={photo}
						alt=""
						src={photo}
						onClick={() => currentPhoto !== index && setCurrentPhoto(index)}
						width={96}
						height={96}
					/>
				))}
			</div>

			<div>
				{photos.length > 1 && (
					<button
						type="button"
						onClick={() => currentPhoto > 0 && setCurrentPhoto(old => old - 1)}
						style={{ left: "0.5rem" }}
					>
						<BiLeftArrow />
					</button>
				)}

				<Image alt="" src={photos[currentPhoto]} width={272} height={408} />

				{photos.length > 1 && (
					<button
						type="button"
						onClick={() => currentPhoto < photos.length - 1 && setCurrentPhoto(old => old + 1)}
						style={{ right: "0.5rem" }}
					>
						<BiRightArrow />
					</button>
				)}
			</div>
		</div>
	);
}
