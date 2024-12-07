import type { ColumnType, Generated } from "kysely";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

interface DefaultFields {
	id: Generated<string>;
	createdAt: ColumnType<Date, string | undefined, never>;
	updatedAt: ColumnType<Date, string | undefined, never>;
}

interface Client extends DefaultFields {
	name: string;
	email: string;
	phoneNumber: string;
}

interface Shirt extends DefaultFields {
	model: string;
	manufacturingPrice: number;
	prices: number[];
	photos: string[];
	colors: string[];
}

interface ShirtOrder extends DefaultFields {
	clientId: string;
	shirtId: string;
	size: string;
	color: string;
	downPayment: number;
	finalPayment: number | null;
	receipts: string[];
	cancelledAt: Timestamp;
	deliveredTo: string | null;
	deliveredAt: Timestamp | null;
	expiredAt: Timestamp | null;
}

export interface DB {
	Client: Client;
	Shirt: Shirt;
	ShirtOrder: ShirtOrder;
}
