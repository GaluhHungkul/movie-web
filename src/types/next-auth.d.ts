import { DefaultUser } from "next-auth"
import { UserFE } from "./type-user-fe"

declare module "next-auth" {
  interface Session {
    user: UserFE
  }

  interface User extends DefaultUser {
    id: string
    isSubscribe?: boolean
    subscribePlanTitle?: string | "Basic Plan" | "Standard Plan" | "Premium Plan" | undefined | null
    // favoritesMovie : FavoriteMovie[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name?: string | null
    email?: string | null
    image? : string | null
    isSubscribe?: boolean
    subscribePlanTitle?: string | "Basic Plan" | "Standard Plan" | "Premium Plan" | undefined | null
    // favoritesMovie : FavoriteMovie[]
  }
}

// declare module "next-auth/adapters" {
//   interface AdapterUser extends DefaultUser {
//     id: string
//     favoritesMovie: FavoriteMovie[]
//   }
// }