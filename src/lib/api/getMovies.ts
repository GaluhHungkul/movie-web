import { TypeMovie } from "@/types/types-movie";
import { useQuery } from "@tanstack/react-query";

type Video =  {
  id : string
  iso_639_1 : string
  iso_3166_1 : string
  key : string
  name : string
  official : boolean
  published_at : string
  site :  string
  size :  number
  type : string
}

type ResVideo = {
  id : number;
  results : Video[]
}

type ResMovieById = {
  descriptionMovie : TypeMovie,
  previewMovie : ResVideo
}

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
        return results.map((movie:TypeMovie & { name? : string }) => {
          return {
            ...movie, 
            backdrop_path : (isBanner ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL: process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL ) + movie.backdrop_path,
            poster_path :  process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  movie.poster_path,
            title : movie.title ?? movie.name ?? "No Title"
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
    queryFn : async () : Promise<ResMovieById | null> => {
      try {
              
        const [previewMovie, descriptionMovie] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`).then(res => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${movie_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`).then(res => res.json())
        ])
        return {
          previewMovie,  
          descriptionMovie : {
            ...descriptionMovie,
            poster_path : process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL +  descriptionMovie.poster_path,
            backdrop_path : process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL + descriptionMovie.backdrop_path,
            title : descriptionMovie.title ?? descriptionMovie.name
          }
        }
      } catch (error) {
        console.log("Error : " , error)
        return null
      }
    }
  })
}


  
