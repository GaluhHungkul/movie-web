import { DefaultSession, DefaultUser } from "next-auth"
import { User as PrismaUser } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: PrismaUser & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name?: string | null
    email?: string | null
  }
}