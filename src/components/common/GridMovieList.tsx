"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { FC } from "react"

type Props = {
    endpoint : string
}

const GridMovieList : FC<Props> = ({ endpoint }) => {

    const { data, isPending, error  } = useMovieQuery(endpoint)

   
    if(isPending) return <p className="text-white  font-bold text-center content-center h-[50vh]">Loading...</p>
    if(error) return <p className="text-white font-bold text-center content-center h-[50vh]">Error : {error.message}</p>
 

  return (
    <div className="grid grid-cols-2 gap-4 ">
        {data?.map(movie => (
            <div className="min-h-64 bg-cover bg-center rounded" key={movie.id} style={{ backgroundImage : `url(${movie.poster_path})` }}>
                
            </div>
        ))}
    </div>
  )
}

export default GridMovieList