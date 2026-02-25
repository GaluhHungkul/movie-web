"use client"

import { useMovieQueryById } from "@/lib/api/getMovies"
import MovieDescription from "./MovieDescription"
import SkeletonDetailMovie from "../skeletons/SkeletonDetailMovie"
import DetailMovieBanner from "./DetailMovieBanner"
// import { useSession } from "next-auth/react"
// import { useState } from "react"
import PreviewVideo from "./PreviewVideo"
import Actors from "./Actors"
import MoviePoster from "./MoviePoster"

// type FavoriteMovieSent = { 
//   backdrop_path : string | undefined
//   title : string | undefined
//   poster_path : string | undefined
//   movieId : number | undefined
// }

const DetailMovie = ({ movieId, tv=false }: { movieId : string, tv?:boolean }) => {

  // const [isLoadingAddToList, setIsLoadingAddToList] = useState(false)

  const type = tv ? "tv" : "movie"

  const { data, isPending, error } = useMovieQueryById(movieId, type ?? "movie")

  // const { update } = useSession()
  if(isPending) return <SkeletonDetailMovie />
  if(error) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Error : {error.message}</h1>

  // const handleAddToList = async (value:FavoriteMovieSent) => {
  //   try {
  //     setIsLoadingAddToList(true)
  //     await fetch(`/api/user/favoritesMovie`, {
  //       method : "POST",
  //       headers : {
  //         "Content-Type" : "application/json"
  //       },
  //       body : JSON.stringify(value)
  //     })
  //   } catch (error) {
  //     console.log("Error : " , error)
  //   } finally {
  //     setIsLoadingAddToList(false)
  //   }
  // }

  // const handleClick = async () => {
  //   const { backdrop_path, title, poster_path, id:movieId } = data?.descriptionMovie || {}
  //   await handleAddToList({ backdrop_path, title, poster_path, movieId })
  //   await update()
  // }

  return (
    <div className="text-white min-h-screen lg:space-x-10 container relative pb-10 flex flex-col">  
      {/* <section className="relative md:block hidden"> */}
      <DetailMovieBanner img={data?.descriptionMovie.backdrop_path ?? ""}/>
        {/* <FlyingMovieDescription data={data} handleAddToList={handleClick} loadingSubmit={isLoadingAddToList}/> */}
      {/* </section>  */}
      {!!data?.previewMovie?.results?.length && <PreviewVideo preview_video_key={data?.previewMovie?.results[0].key ?? ""}/>}
      <div className="md:flex md:mt-8 md:gap-8">
        <MoviePoster poster_path={data?.descriptionMovie?.poster_path ?? ""} alt={data?.descriptionMovie?.title ?? ""}/>       
        <MovieDescription descriptionMovie={data?.descriptionMovie} isMovie={type !== "tv"} />
      </div>
      <Actors data={data?.actors.cast ?? []}/>
    </div>
  )
}

export default DetailMovie