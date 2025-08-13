import { Prisma } from "@prisma/client"
import { create } from "zustand"

type UserWithFavoritesMovie = Prisma.UserGetPayload<{
    include : {
        favoritesMovie : true
    }
}>

type useUser = {
    data : UserWithFavoritesMovie | null,
    setUser : (val:UserWithFavoritesMovie) => void
}

const useUser = create<useUser>()((set) => ({
    data : null,
    setUser : (val) => set({ data : val })
}))

export default useUser