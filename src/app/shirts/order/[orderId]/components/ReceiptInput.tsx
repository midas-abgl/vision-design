"use client";
import { useRef } from "react";
import styles from "../styles.module.scss";

export function ReceiptInput() {
	const fileInputRef = useRef<HTMLInputElement>(null);

	return (
		<div className={styles.receiptInput} onClick={() => fileInputRef.current?.click()}>
			<input ref={fileInputRef} type="file" />
		</div>
	);
}
