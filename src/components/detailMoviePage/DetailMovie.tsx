"use client"

import { useMovieQueryById } from "@/lib/api/getMovies"
import MovieDescription from "./MovieDescription"
import MoviePoster from "./MoviePoster"
import PreviewVideo from "./PreviewVideo"
import SkeletonDetailMovie from "../skeleton/SkeletonDetailMovie"



const DetailMovie = ({ movieId, type }: { movieId : string, type? : "movie" | "tv" }) => {

  const { data, isPending, error } = useMovieQueryById(movieId, type ?? "movie")


  if(isPending) return <SkeletonDetailMovie />
  if(error) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Error : {error.message}</h1>


  return (
    <div className="text-white lg:flex lg:space-x-10">   
      <MoviePoster poster_path={data?.descriptionMovie?.poster_path ?? ""} alt={data?.descriptionMovie?.title ?? ""}/>       
      <MovieDescription descriptionMovie={data?.descriptionMovie}/>
      {!!data?.previewMovie?.results?.length && <PreviewVideo preview_video_key={data?.previewMovie?.results[0].key ?? ""}/>}
    </div>
  )
}

export default DetailMovie