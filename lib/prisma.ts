import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DATABASE_URL as string;

const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({ adapter });

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ['query'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
