import { UserFE } from "@/types/type-user-fe"
import { create } from "zustand"


type useUser = {
    user: UserFE
    setUser : (val:UserFE) => void
}

const useUser = create<useUser>()((set) => ({
    user : null,
    setUser : (val) => set({ user : val })
}))

export default useUser