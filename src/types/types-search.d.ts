export type TmdbSearchTv = {
  adult: boolean
  backdrop_path: string | null
  first_air_date: string
  genre_ids: number[]
  id: number
  media_type: "tv"
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

export type TmdbSearchMovie = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  media_type: "movie"
  title: string
  original_title: string
  original_language: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
}

export type TmdbSearchPerson = {
  adult: boolean
  gender: number
  id: number
  media_type: "person"
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  known_for_department: string
}

export type TmdbSearchResult =
  | TmdbSearchMovie
  | TmdbSearchTv
  | TmdbSearchPerson

export type TmdbMultiSearchResponse = {
  page: number
  results: TmdbSearchResult[]
  total_pages: number
  total_results: number
  nextPage: number | undefined
}
