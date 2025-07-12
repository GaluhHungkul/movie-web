export type TypeMovie = {
    id : number;
    backdrop_path : string;
    poster_path : string;
    title? : string
    name? : string
    adult: boolean
    genre_ids: number[]
    overview: string
    popularity :  number
    vote_average :  number
    vote_count :  784
}