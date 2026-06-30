import { PrismaClient } from '@prisma/client'

// Singleton de Prisma. En dev evitamos crear multiples instancias
// por el hot-reload de tsx watch.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
