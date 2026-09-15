import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}
const createPrismaClient = () => {
  if (typeof window === 'undefined' && !process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is missing. Prisma Client will not be able to query the database.');
    return new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://dummy:dummy@localhost/dummy" // Fallback to prevent crash on init
        }
      }
    });
  }
  return new PrismaClient();
};

export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// This method is for development in hot reload