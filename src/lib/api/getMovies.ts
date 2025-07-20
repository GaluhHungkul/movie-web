import { TypeMovie } from "@/types/types-movie";
import { useQuery } from "@tanstack/react-query";

export const useMovieQuery = (endpoint:string, isBanner:boolean=false) => {
  return useQuery({
    queryKey : ["movies", endpoint],
    queryFn: async () : Promise<TypeMovie[]> => {
      try {         
        const chain = endpoint.includes("?") ? "&" : "?"
        const path = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL + endpoint + chain
        const res = await fetch(`${path}api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch movie banner data");
        const { results } = await res.json()
        return results.map((movie:TypeMovie) => {
          return {
            ...movie, 
            backdrop_path : (isBanner ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL: process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL ) + movie.backdrop_path,
            poster_path :  process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  movie.poster_path,
          }
        })
      } catch (error) {
        console.log("Error : " , error)
        return []
      }
    },
  });
};

export const useMovieQueryById = (movie_id:string)  => {
  return useQuery({
    queryKey : ["movie_id" , movie_id],
    queryFn : async () : Promise<TypeMovie | null> => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${movie_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
        if(!res.ok) throw new Error("Failed to fetch")
        const movie = await res.json()
        return {
          ...movie,
          poster_path : process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  movie.poster_path,
          backdrop_path : process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL + movie.backdrop_path
        }
      } catch (error) {
        console.log("Error : " , error)
        return null
      }
    }
  })
}


  
