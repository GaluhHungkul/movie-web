import { DefaultSession } from "next-auth";
import { create } from "zustand"

type User = DefaultSession["user"] & {
    isSubscribe?: boolean;
    id?: string
    subscribePlanTitle?: string | "Basic Plan" | "Standard Plan" | "Premium Plan" | undefined | null
} | null



type useUser = {
    user: User
    setUser : (val:User) => void
}

const useUser = create<useUser>()((set) => ({
    user : null,
    setUser : (val) => set({ user : val })
}))

export default useUser