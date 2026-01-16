import { useQuery } from "@tanstack/react-query";

export type Genre = {
  id : number;
  name : string
}

type GenreList = {
  genres : Genre[]  
}

export const useGenresQuery = (type : "movie" | "tv"="movie") => {
  return useQuery({
    queryKey : ["all_genres", type],
    queryFn: async () : Promise<GenreList> => {
      try { 
        const base_path = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`        
        const res = await fetch(base_path)
        if(!res.ok) throw Error("Failed to get genres data")
        return res.json()
      } catch (error) {
        console.log("Error : " , error)
        throw error
      }
    },
  });
};
