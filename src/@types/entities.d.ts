interface Shirt {
	id: string;
	model: string;
	manufacturingPrice: number;
	prices: number[];
	photos: string[];
	colors: string[];
}

type ShirtListing = Record<string, Omit<Shirt, "id" | "manufacturingPrice">>;

interface ShirtOrder {
	id: string;
	clientId: string;
	batchId: string | null;
	shirtId: string;
	size: string;
	color: string;
	downPayment: number;
	finalPayment: number | null;
	receipts: string[];
	cancelledAt: Date | null;
	deliveredTo: string | null;
	deliveredAt: Date | null;
	expiredAt: Date | null;
	shirt?: Shirt;
	createdAt: Date;
	updatedAt: Date;
}
