import { PrismaClient, Prisma } from '@/prisma/generated/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing');
}

const adapter = new PrismaMariaDb(databaseUrl);

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    // log: ['query', 'info']
  });
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global;
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
export type { Prisma };
