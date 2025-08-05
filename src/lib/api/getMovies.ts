import { TypeMovie } from "@/types/types-movie";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_TOTAL_MOVIE_PER_REQUEST = 20

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

type MovieQueryParam = {
  endpoint : string
  isBanner? : boolean
  page? : number
  totalMoviePerRequest? : number
}

type ReturnMovieQuery = {
  movies : TypeMovie[],
  isNextPage : boolean
}

const defaultMovieQueryParams : MovieQueryParam= {
  isBanner : false,
  page : 1,
  endpoint : "/movie/popular",
  totalMoviePerRequest : DEFAULT_TOTAL_MOVIE_PER_REQUEST
}

export const useMovieQuery = (params = defaultMovieQueryParams) => {

  const { endpoint, isBanner, totalMoviePerRequest } = params
 
  const page = isNaN(params.page!) ? 1 : params.page

  return useQuery({
    queryKey : ["movies", endpoint, page],
    queryFn: async () : Promise<ReturnMovieQuery | null> => {
      try {         
        const chain = endpoint.includes("?") ? "&" : "?"
        const path = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL + endpoint + `${chain}page=${page}` 
        const res = await fetch(`${path}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch movie data");
        const { results, page: currPage, total_pages } = await res.json()
        const movies = results.slice(0,totalMoviePerRequest).map((movie:TypeMovie & { name? : string }) => {
          return {
            ...movie, 
            backdrop_path : (isBanner ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL: process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL ) + movie.backdrop_path,
            poster_path :  process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  movie.poster_path,
            title : movie.title ?? movie.name ?? "No Title"
          }
        })
        return {
          movies, 
          isNextPage : currPage < total_pages
        }
      } catch (error) {
        console.log("Error : " , error)
        return null
      }
    },
  });
};

export const useMovieQueryById = (media_id:string, type:"movie" | "tv"="movie")  => {
  return useQuery({
    queryKey : [type , media_id],
    queryFn : async () : Promise<ResMovieById | null> => {
      try {
              
        const [previewMovie, descriptionMovie] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${type}/${media_id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`).then(res => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/${type}/${media_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`).then(res => res.json())
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


  
