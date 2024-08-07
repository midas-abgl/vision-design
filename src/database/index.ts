import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient().$extends({
		result: {
			shirt: {
				manufacturingPrice: {
					compute({ manufacturingPrice }) {
						return manufacturingPrice.toNumber();
					},
				},
				prices: {
					compute({ prices }) {
						return prices.map(price => price.toNumber());
					},
				},
			},
			shirtOrder: {
				downPayment: {
					compute({ downPayment }) {
						return downPayment.toNumber();
					},
				},
				finalPayment: {
					compute({ finalPayment }) {
						return finalPayment?.toNumber();
					},
				},
			},
		},
	});
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: Recommended Prisma way
declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
