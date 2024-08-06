import type { Shirt as PrismaShirt } from "@prisma/client";

export interface Shirt extends Omit<PrismaShirt, "prices"> {
	prices: number[];
}
