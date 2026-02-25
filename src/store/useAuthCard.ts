import { create } from "zustand"

type AuthType = "signIn" | "signUp" | null

type AuthCardType = {
    currentAuth: AuthType
    setCurrentAuth: (val: AuthType) => void
}

const useAuthCard = create<AuthCardType>()((set) => ({
    currentAuth: null, 
    setCurrentAuth: (state) => set({ currentAuth: state })
}))

export default useAuthCard