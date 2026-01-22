export type TypeMovie = {
    id : number;
    backdrop_path : string;
    poster_path : string;
    title? : string
    adult: boolean
    genres?: {
        id : number;
        name : string
    }[]
    genre_ids : number[]
    overview: string
    popularity :  number
    vote_average :  number
    vote_count :  784;
    release_date: string;
    runtime: number;
    tagline: string;
    first_air_date?: string;
    number_of_episodes?: number;
    number_of_seasons?: number
}

type Cast = {
  profile_path: string;
  name: string;
  gender: number;
  id: number;
  character: string
  original_name: string
  know_for_department: string
}

export type Video =  {
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


export type SearchedMovie = {
  adult: boolean
  backdrop_path: string | null
  first_air_date: string
  genre_ids: number[]
  id: number
  media_type: "tv" | "movie"
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  vote_average: number
  vote_count: number
}