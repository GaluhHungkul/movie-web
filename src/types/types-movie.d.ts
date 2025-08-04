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
    vote_count :  784
}