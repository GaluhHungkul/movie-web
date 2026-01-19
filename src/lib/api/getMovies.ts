import { Cast, TypeMovie, Video } from "@/types/types-movie";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query"

const DEFAULT_TOTAL_MOVIE_PER_REQUEST = 10


type ResVideo = {
  id : number;
  results : Video[]
}



type ResMovieById = {
  descriptionMovie : TypeMovie,
  previewMovie : ResVideo
  actors : {
    id: number;
    cast: Cast[]
  }
}

type MovieQueryParam = {
  endpoint : string
  page? : number
  totalMoviePerRequest? : number
}

type ReturnMovieQuery = {
  movies : TypeMovie[],
  isNextPage : boolean
}

type ReturnInfiniteMovieQuery = {
  movies : TypeMovie[],
  nextPage : number | undefined
}

const defaultMovieQueryParams : MovieQueryParam= {
  page : 1,
  endpoint : "/movie/popular",
  totalMoviePerRequest : DEFAULT_TOTAL_MOVIE_PER_REQUEST
}

export const useBannerQuery = ({ endpoint } : { endpoint: string }) => {
  return useQuery({
    queryKey : ["banner", endpoint],
    queryFn: async () : Promise<ReturnMovieQuery | null> => {
      try {         
        const path = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL + endpoint 
        const res = await fetch(`${path}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch banner data");
        const { results, page: currPage, total_pages } = await res.json()
        const movies = results.slice(0,5).map((movie:TypeMovie & { name? : string }) => {
          return {
            ...movie, 
            backdrop_path : movie.backdrop_path  ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL + movie.backdrop_path : "/assets/images/backdrop_fallback.webp",
            poster_path :  movie.poster_path ? process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  movie.poster_path : "/assets/images/poster_fallback.webp",
            title : movie.title ?? movie.name ?? "No Title"
          }
        })
        return {
          movies, 
          isNextPage : currPage < total_pages
        }
      } catch (error) {
        console.log("Error : " , error)
        throw error
      }
    },
  });
}

export const useMovieQuery = (params = defaultMovieQueryParams) => {

  const { endpoint, totalMoviePerRequest } = params
 
  const page = isNaN(params.page!) ? 1 : params.page

  return useQuery({
    queryKey : ["movies", endpoint, page],
    queryFn: async () : Promise<ReturnMovieQuery | null> => {
      try {         
        const chain = endpoint.includes("?") ? "&" : "?"
        const path = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL + endpoint + `${chain}page=${page}` 
        const res = await fetch(`${path}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch movie data");
        const data = await res.json()
        const { results, page: currPage, total_pages } = data
        const movies = results.slice(0,totalMoviePerRequest).map((movie:TypeMovie & { name? : string }) => {
          return {
            ...movie, 
            backdrop_path : movie.backdrop_path  ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL + movie.backdrop_path : "/assets/images/backdrop_fallback.webp",
            poster_path :  movie.poster_path ? process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  movie.poster_path : "/assets/images/poster_fallback.webp",
            title : movie.title ?? movie.name ?? "No Title"
          }
        })
        return {
          movies, 
          isNextPage : currPage < total_pages
        }
      } catch (error) {
        console.log("Error : " , error)
        throw error
      }
    },
  });
};

export const useInfiniteMovieQuery = (
  params = {
    ...defaultMovieQueryParams, 
  }
) => {
  const { endpoint, totalMoviePerRequest } = params

  return useInfiniteQuery({
    queryKey: ["movies", endpoint],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }): Promise<ReturnInfiniteMovieQuery | null> => {
      try {
        const chain = endpoint.includes("?") ? "&" : "?"
        const path =
          process.env.NEXT_PUBLIC_TMDB_API_BASE_URL +
          endpoint +
          `${chain}page=${pageParam}`

        const res = await fetch(
          `${path}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        )

        if (!res.ok) throw new Error("Failed to fetch movie data")

        const { results, page, total_pages } = await res.json()

        const movies = results
          .slice(0, totalMoviePerRequest)
          .map((movie: TypeMovie & { name?: string }) => ({
            ...movie,
            backdrop_path:
              movie.backdrop_path ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL +
              movie.backdrop_path : "/assets/images/backdrop_fallback.webp",
            poster_path:
              movie.poster_path ? 
              process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +
              movie.poster_path : "/assets/images/poster_fallback.webp",
            title: movie.title ?? movie.name ?? "No Title",
          }))

        return {
          movies,
          nextPage: page < total_pages ? page + 1 : undefined,
        }
      } catch (error) {
        console.log("Error:", error)
        throw error
      }
    },

    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage
    },
  })
}

export const useMovieQueryById = (media_id:string, type:"movie" | "tv"="movie")  => {
  return useQuery({
    queryKey : [type , media_id],
    queryFn : async () : Promise<ResMovieById | null> => {
      try {
              
        const [previewMovie, descriptionMovie, actors] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${type}/${media_id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`).then(res => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/${type}/${media_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`).then(res => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/${type}/${media_id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`).then(res => res.json()),
        ])
        return {
          previewMovie,  
          descriptionMovie : {
            ...descriptionMovie,
            poster_path : descriptionMovie.poster_path ? process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  descriptionMovie.poster_path : "/assets/images/poster_fallback.webp",
            backdrop_path : descriptionMovie.backdrop_path  ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL + descriptionMovie.backdrop_path : "/assets/images/backdrop_fallback.webp",
            title : descriptionMovie.title ?? descriptionMovie.name
          },
          actors: {
            ...actors,
            cast : actors.cast.slice(0,12).map((c:Cast) => ({
              ...c, 
              profile_path: c.profile_path ? process.env.NEXT_PUBLIC_TMDB_API_PP_BASE_URL + c.profile_path : "/assets/images/default_pp.png",
            }))
          }
        }
      } catch (error) {
        console.log("Error : " , error)
        throw error
      }
    }
  })
}