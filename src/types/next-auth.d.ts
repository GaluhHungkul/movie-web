import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      isSubscribe?: boolean;
      id?: string
      subscribePlanTitle?: string | "Basic Plan" | "Standard Plan" | "Premium Plan" | undefined | null
    }
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