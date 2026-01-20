import { useQuery } from "@tanstack/react-query";

export type Genre = {
  id : number;
  name : string
}

type GenreList = {
  genres : Genre[]  
}

export const useOneTypeGenreQuery = (type : "movie" | "tv"="movie") => {
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

type AllGenres = {
  movieGenres: Genre[];
  tvGenres: Genre[]
}

export const useGenresQuery = () => {
  return useQuery({
    queryKey : ["all_genres"],
    queryFn: async () : Promise<AllGenres> => {
      try { 
        const base_path = (type:"movie" | "tv") =>  `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/genre/${type}/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`        

        const [movieGenres, tvGenres] = await Promise.all([
          fetch(base_path("movie")).then(res => res.json()),
          fetch(base_path("tv")).then(res => res.json())
        ])
        
        return {
          movieGenres: movieGenres.genres, 
          tvGenres: tvGenres.genres
        }

      } catch (error) {
        console.log("Error : " , error)
        throw error
      }
    },
  });
};
