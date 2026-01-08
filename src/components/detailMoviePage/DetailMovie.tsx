"use client"

import { useMovieQueryById } from "@/lib/api/getMovies"
import MovieDescription from "./MovieDescription"
import MoviePoster from "./MoviePoster"
import SkeletonDetailMovie from "../skeleton/SkeletonDetailMovie"
import DetailMovieBanner from "./DetailMovieBanner"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import useUser from "@/zustand/useUser"

type FavoriteMovieSent = { 
  backdrop_path : string | undefined
  title : string | undefined
  poster_path : string | undefined
  movieId : number | undefined
}


const DetailMovie = ({ movieId, tv=false }: { movieId : string, tv?:boolean }) => {

  const [isSubmitFavorite, setIsSubmitFavorite] = useState(false)

  const type = tv ? "tv" : "movie"

  const { data, isPending, error } = useMovieQueryById(movieId, type ?? "movie")

  const { update } = useSession()

  const { data:user } = useUser()

  const favorited = user?.favoritesMovie.map((movie) => movie.movieId).includes(movieId)

  if(isPending) return <SkeletonDetailMovie />
  if(error) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Error : {error.message}</h1>

  const handleFavorite = async (value:FavoriteMovieSent) => {
    try {
      setIsSubmitFavorite(true)
      const res = await fetch(`/api/user/favorites`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(value)
      })
      console.log(await res.json())
    } catch (error) {
      console.log("Error : " , error)
    } finally {
      setIsSubmitFavorite(false)
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
      <section className="lg:my-10 w-full relative lg:flex justify-between items-start">
        <div className="lg:flex lg:items-start lg:gap-20 ">
          <MoviePoster poster_path={data?.descriptionMovie?.poster_path ?? ""} alt={data?.descriptionMovie?.title ?? ""}/>       
          {/* {!!data?.previewMovie?.results?.length && <PreviewVideo preview_video_key={data?.previewMovie?.results[0].key ?? ""}/>} */}
        </div>
        <button disabled={isSubmitFavorite} className="cursor-pointer absolute right-4 -bottom-16 lg:static" onClick={handleClickFavorite}>
          {isSubmitFavorite ? <div className="absolute right-3 border-4 border-r-white/50 border-b-white/50 animate-spin size-10 rounded-full "></div> : (favorited ? <BookmarkCheck className="md:scale-125" size={32}/> : <Bookmark className="md:scale-125" size={32}/>)}
          </button>
      </section>
      <MovieDescription descriptionMovie={data?.descriptionMovie} isMovie={type !== "tv"}/>
    </div>
  )
}

export default DetailMovie