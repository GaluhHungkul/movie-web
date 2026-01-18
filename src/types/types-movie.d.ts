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
