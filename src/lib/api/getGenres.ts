import { useQuery } from "@tanstack/react-query";

export type Genre = {
  id : number;
  name : string
}

type GenreList = {
  genres : Genre[]
}[]

export const useGenresQuery = () => {
  return useQuery({
    queryKey : ["all_genres"],
    queryFn: async () : Promise<GenreList> => {
      try { 
        const base_path = (type : "movie" | "tv") =>  `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`        
        return Promise.all([
            fetch(base_path("movie")).then(res => res.json()),
            fetch(base_path("tv")).then(res => res.json())
        ])
      } catch (error) {
        console.log("Error : " , error)
        return []
      }
    },
  });
};
