"use client"

import { useMovieQueryById } from "@/lib/api/getMovies"
import MovieDescription from "./MovieDescription"
import MoviePoster from "./MoviePoster"
import PreviewVideo from "./PreviewVideo"
import SkeletonDetailMovie from "../skeleton/SkeletonDetailMovie"
import DetailMovieBanner from "./DetailMovieBanner"
import { Bookmark } from "lucide-react"
import { useSession } from "next-auth/react"

type FavoriteMovieSent = { 
  backdrop_path : string | undefined
  title : string | undefined
  poster_path : string | undefined
  movieId : number | undefined
}


const DetailMovie = ({ movieId, type }: { movieId : string, type? : "movie" | "tv" }) => {

  const { data, isPending, error } = useMovieQueryById(movieId, type ?? "movie")

  const { update } = useSession()

  if(isPending) return <SkeletonDetailMovie />
  if(error) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Error : {error.message}</h1>

  const handleFavorite = async (value:FavoriteMovieSent) => {
    try {
      await fetch(`/api/user/favorites`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(value)
      })
    } catch (error) {
      console.log("Error : " , error)
    }
  }

  const handleClickFavorite = async () => {
    const { backdrop_path, title, poster_path, id:movieId } = data?.descriptionMovie || {}
    await handleFavorite({ backdrop_path, title, poster_path, movieId })
    await update()
  }

  return (
    <div className="text-white lg:space-x-10 relative mb-10">   
      <DetailMovieBanner img={data?.descriptionMovie.backdrop_path ?? ""}/>
      <section className="lg:my-10 relative lg:flex justify-between items-start">
        <div className="flex lg:items-start lg:gap-10">
          <MoviePoster poster_path={data?.descriptionMovie?.poster_path ?? ""} alt={data?.descriptionMovie?.title ?? ""}/>       
          {!!data?.previewMovie?.results?.length && <PreviewVideo preview_video_key={data?.previewMovie?.results[0].key ?? ""}/>}
        </div>
        <button className="cursor-pointer" onClick={handleClickFavorite}><Bookmark  size={64}/></button>
      </section>
      <MovieDescription descriptionMovie={data?.descriptionMovie} isMovie={type !== "tv"}/>
    </div>
  )
}

export default DetailMovie