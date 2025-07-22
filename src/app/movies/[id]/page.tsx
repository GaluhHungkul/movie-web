"use client"

import { useMovieQueryById } from "@/lib/api/getMovies"
import { useParams } from "next/navigation"
import Image from "next/image"

const DetailMoviePage = () => {

    const { id } = useParams() 

    const { data, isPending, error } = useMovieQueryById(id + "")

    if(error) return <p className="text-white font-bold text-3xl h-[80vh] text-center content-center">Error : {error.message}</p>
    if(isPending) return <p className="text-white font-bold text-3xl h-[80vh] text-center content-center">Loading...</p>

  return (
    <div className="min-h-[200vh]">
        <div className=" aspect-[2/3] rounded overflow-hidden relative">
          <Image src={`${process.env.NEXT_PUBLIC_TMDB_API_IMG_BASE_URL}${data?.poster_path}`} alt={data?.title ?? ""} fill/> 
        </div>
    </div>
  )
}

export default DetailMoviePage