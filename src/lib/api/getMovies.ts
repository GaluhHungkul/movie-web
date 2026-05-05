import { Cast, TypeMovie, Video } from "@/types/types-movie";
import { TmdbMultiSearchResponse } from "@/types/types-search";
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
        const path = `/api/movies?endpoint=${encodeURIComponent(endpoint)}`
        const res = await fetch(path);

        if (!res.ok) throw new Error("Failed to fetch banner data");
        const { results, page: currPage, total_pages } = await res.json()

        const movies = results
          .map((movie: TypeMovie & { name?: string }) => ({
            ...movie,
            backdrop_path:
                movie.backdrop_path ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL +
                movie.backdrop_path : "/assets/img/backdrop_fallback.webp",
            poster_path:
                movie.poster_path ? 
                process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +
                movie.poster_path : "/assets/img/poster_fallback.webp",
            title: movie.title ?? movie.name ?? "No Title",
          }))

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
        const path = "/api/movies/" + `${chain}endpoint=${endpoint}&page=${page}&limit=${totalMoviePerRequest}` 
        const res = await fetch(path)
        if (!res.ok) throw new Error("Failed to fetch movie data");

        const { results, isNextPage } = await res.json()

        const movies = results
          .map((movie: TypeMovie & { name?: string }) => ({
            ...movie,
            backdrop_path:
                movie.backdrop_path ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL +
                movie.backdrop_path : "/assets/img/backdrop_fallback.webp",
            poster_path:
                movie.poster_path ? 
                process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +
                movie.poster_path : "/assets/img/poster_fallback.webp",
            title: movie.title ?? movie.name ?? "No Title",
          }))

        return { movies, isNextPage }
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

        const path = "/api/movies" + `?endpoint=${encodeURIComponent(endpoint)}&page=${pageParam}&limit=${totalMoviePerRequest}&infinite=true`


        const res = await fetch(path)
        if (!res.ok) throw new Error("Failed to fetch movie data")

        const { results, page, total_pages } = await res.json()

        const movies = results
          .map((movie: TypeMovie & { name?: string }) => ({
            ...movie,
            backdrop_path:
                movie.backdrop_path ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL +
                movie.backdrop_path : "/assets/img/backdrop_fallback.webp",
            poster_path:
                movie.poster_path ? 
                process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +
                movie.poster_path : "/assets/img/poster_fallback.webp",
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
              
        const res = await fetch(`/api/movies/${media_id}?type=${type}`)
        if(!res.ok) throw Error()
        
        const { previewMovie, descriptionMovie, actors } = await res.json()
        
        return {
          previewMovie,
          descriptionMovie : {
            ...descriptionMovie,
            poster_path : descriptionMovie.poster_path ? process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  descriptionMovie.poster_path : "/assets/img/poster_fallback.webp",
            backdrop_path : descriptionMovie.backdrop_path  ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL + descriptionMovie.backdrop_path : "/assets/img/backdrop_fallback.webp",
            title : descriptionMovie.title ?? descriptionMovie.name
          },
          actors: {
            ...actors,
            cast : actors.cast.slice(0,12).map((c:Cast) => ({
              ...c, 
              profile_path: c.profile_path ? process.env.NEXT_PUBLIC_TMDB_API_PP_BASE_URL + c.profile_path : "/assets/img/default_pp.png",
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

export const useSearchMulti = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search", "multi", query],
    initialPageParam: 1,
    enabled: query.trim().length >= 2, // ⬅️ penting
    queryFn: async ({ pageParam = 1 }) : Promise<TmdbMultiSearchResponse> => {
      const res = await fetch(`/api/movies/search/?query=${encodeURIComponent(query)}&page=${pageParam}`,)
      if (!res.ok) throw new Error("Failed to fetch search results")
      
      const data = await res.json() as TmdbMultiSearchResponse

      const response = {
        ...data, 
        results: data.results.map(item => (
            item.media_type === "person" 
            ? {
            ...item, 
            profile_path: item.profile_path ? process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  item.profile_path : "/assets/img/default_pp.png",
            } 
            : {
            ...item, 
            poster_path : item.poster_path ? process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL +  item.poster_path : "/assets/img/poster_fallback.webp",
            backdrop_path : item.backdrop_path  ? process.env.NEXT_PUBLIC_TMDB_API_BANNER_BASE_URL + item.backdrop_path : "/assets/img/backdrop_fallback.webp",
            }
        )),
        nextPage: data.page < data.total_pages ? data.page + 1 : undefined,
      }

      return response
        
    },
    getNextPageParam: (lastpage) => {
      return lastpage?.nextPage
    }
  })
}
