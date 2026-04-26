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
        const { movies, page: currPage, total_pages } = await res.json()

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

        const { movies, isNextPage } = await res.json()

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

        const { movies, page, total_pages } = await res.json()

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

        return { actors, descriptionMovie, previewMovie }
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
      
      const { results, nextPage, page, total_pages, total_results } = await res.json() as TmdbMultiSearchResponse

      return { results, nextPage, page, total_pages, total_results }
        
    },
    getNextPageParam: (lastpage) => {
      return lastpage?.nextPage
    }
  })
}
