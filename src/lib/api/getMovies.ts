import { TypeMovie } from "@/types/types-movie";
import { useQuery } from "@tanstack/react-query";

export const useMovieQuery = ({ type, category } : { type : string; category : string }) => {
  return useQuery({
    queryKey: [type, category],
    queryFn: async () : Promise<TypeMovie[]> => {
      try {
        
        const path = [process.env.NEXT_PUBLIC_TMDB_API_BASE_URL, type, category].join("/")
        const res = await fetch(`${path}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch movie banner data");
        const { results } = await res.json()
        return results.splice(0,10).map((movie:TypeMovie) => {
          return {
            ...movie, 
            backdrop_path : process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL + movie.backdrop_path,
            poster_path : process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL + movie.poster_path,
          }
        })
      } catch (error) {
        console.log("Error : " , error)
        return []
      }
    },
  });
};


  