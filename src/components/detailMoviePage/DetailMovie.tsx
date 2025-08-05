"use client"

import { useMovieQueryById } from "@/lib/api/getMovies"
import MovieDescription from "./MovieDescription"
import MoviePoster from "./MoviePoster"
import PreviewVideo from "./PreviewVideo"
import SkeletonDetailMovie from "../skeleton/SkeletonDetailMovie"
import DetailMovieBanner from "./DetailMovieBanner"



const DetailMovie = ({ movieId, type }: { movieId : string, type? : "movie" | "tv" }) => {

  const { data, isPending, error } = useMovieQueryById(movieId, type ?? "movie")


  if(isPending) return <SkeletonDetailMovie />
  if(error) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Error : {error.message}</h1>


  return (
    <div className="text-white lg:space-x-10 relative mb-10">   
      <DetailMovieBanner img={data?.descriptionMovie.backdrop_path ?? ""}/>
      <section className="lg:my-10 relative lg:flex justify-between items-start">
        <MoviePoster poster_path={data?.descriptionMovie?.poster_path ?? ""} alt={data?.descriptionMovie?.title ?? ""}/>       
        {!!data?.previewMovie?.results?.length && <PreviewVideo preview_video_key={data?.previewMovie?.results[0].key ?? ""}/>}
      </section>
      <MovieDescription descriptionMovie={data?.descriptionMovie} isMovie={type !== "tv"}/>
    </div>
  )
}

export default DetailMovie