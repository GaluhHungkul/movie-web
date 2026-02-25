import { User } from "@prisma/client"
import { create } from "zustand"

type useUser = {
    user : User | null,
    setUser : (val:User) => void
}

const useUser = create<useUser>()((set) => ({
    user : null,
    setUser : (val) => set({ user : val })
}))

export default useUser