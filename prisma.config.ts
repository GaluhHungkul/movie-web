import 'dotenv/config'
import { env } from "prisma/config"
import type { PrismaConfig } from "prisma/config"

export default {
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
} satisfies PrismaConfig
