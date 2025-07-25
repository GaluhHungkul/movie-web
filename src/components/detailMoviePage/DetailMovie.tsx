"use client"

import { useEffect, useState } from "react"
import { useMovieQueryById } from "@/lib/api/getMovies"
import { useParams } from "next/navigation"
import MovieDescription from "./MovieDescription"
import MoviePoster from "./MoviePoster"
import PreviewVideo from "./PreviewVideo"

type Video =  {
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

type ResVideo = {
    id : number;
    results : Video[]
}

const DetailMovie = () => {

    const { movieId } = useParams() 

    const { data, isPending, error } = useMovieQueryById(movieId + "")

    const [video, setVideo] = useState<ResVideo | null>(null)

    useEffect(() => {
        const getPreviewVideo = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
            const results = await res.json()
            console.log(results)
            setVideo(results)
        }
        getPreviewVideo()
    },[movieId])

    if(error) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Error : {error.message}</h1>
    if(isPending) return <h1 className="text-white  text-3xl h-[80vh] text-center content-center">Loading...</h1>


  return (
    <div className="min-h-[200vh] text-white">   
        <MoviePoster poster_path={data?.poster_path ?? ""} alt={data?.title ?? ""}/>       
        <MovieDescription data={data}/>
        <PreviewVideo preview_video_key={video?.results[0].key ?? ""}/>
    </div>
  )
}

export default DetailMovie