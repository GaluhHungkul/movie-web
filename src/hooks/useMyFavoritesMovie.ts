import { FavoriteMovie } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

type MyFavoritesMovieResponse = Promise<{
    data: {
        movies: FavoriteMovie[]
    }
}>

export const useMyFavoritesMovie = (movieCount:number | null=null) => {
    const count = movieCount ? `?count=${movieCount}` : ""

    return useQuery({
        queryKey: ["myFavoritesMovie"],
        queryFn: async () : MyFavoritesMovieResponse => {
            const res = await fetch(`/api/user/favoritesMovie${count}`)
            if(!res.ok) throw Error("Failed to get favorites movie")
            const data = await res.json()
            return data
        }
    })
}