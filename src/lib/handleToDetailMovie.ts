import useAuthCard from "@/store/useAuthCard"
import useUser from "@/store/useUser"
import { MouseEvent } from "react"
import { toast } from "sonner"

export const useHandleToDetailMovie = () => {
    const { user } = useUser()
    const { setCurrentAuth } = useAuthCard()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!user) {
            e.preventDefault()
            toast.warning("You must login first")
            setCurrentAuth("signIn")
        }
    }

    return handleClick
}