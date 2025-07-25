"use client"

import { useMovieQueryById } from "@/lib/api/getMovies"
import { useParams } from "next/navigation"
import MovieDescription from "./MovieDescription"
import MoviePoster from "./MoviePoster"

const DetailMovie = () => {

    const { id } = useParams() 

    const { data, isPending, error } = useMovieQueryById(id + "")

    if(error) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Error : {error.message}</h1>
    if(isPending) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Loading...</h1>

  return (
    <div className="min-h-[200vh] text-white">   
        <MoviePoster poster_path={data?.poster_path ?? ""} alt={data?.title ?? ""}/>       
        <MovieDescription data={data}/>
    </div>
  )
}

export default DetailMovie