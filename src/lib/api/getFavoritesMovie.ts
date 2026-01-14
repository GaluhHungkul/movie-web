import { useQuery } from "@tanstack/react-query"

export const useFavoritesMovie = (userId:string) => {
    return useQuery({
        queryKey : ["favorites-movie", userId],
        queryFn : async () => {
            if(!userId) return null
            try {
                const res = await fetch(`/api/favoritesmovie/${userId}`)
                const data = await res.json()
                return data
            } catch (error) {
                console.log("Error : " , error)
                return null
            }
        }
    })
}