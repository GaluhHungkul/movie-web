import { DefaultSession, DefaultUser } from "next-auth"
import { FavoriteMovie, Prisma } from "@prisma/client"

type UserWithFavorites = Prisma.UserGetPayload<{
  include : {
    favoritesMovie : true
  }
}>

declare module "next-auth" {
  interface Session {
    user: UserWithFavorites & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    favoritesMovie : FavoriteMovie[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name?: string | null
    email?: string | null
    image? : string | null
    favoritesMovie : FavoriteMovie[]
  }
}

// declare module "next-auth/adapters" {
//   interface AdapterUser extends DefaultUser {
//     id: string
//     favoritesMovie: FavoriteMovie[]
//   }
// }