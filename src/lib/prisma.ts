import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
})

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
