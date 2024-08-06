import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient().$extends({
		result: {
			shirt: {
				prices: {
					compute({ prices }) {
						return prices.map(price => price.toNumber());
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
