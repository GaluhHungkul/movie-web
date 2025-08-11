import { User } from "@prisma/client"
import { create } from "zustand"

type useUser = {
    data : User | null,
    setUser : (val:User) => void
}

const useUser = create<useUser>()((set) => ({
    data : null,
    setUser : (val) => set({ data : val })
}))

export default useUser