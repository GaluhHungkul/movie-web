"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import SkeletonGridMovieList from "../skeleton/SkeletonGridMovieList"

type Props = {
  endpoint : string
}

const GridMovieList : FC<Props> = ({ endpoint }) => {

    const { data, isPending, error } = useMovieQuery(endpoint)
   
    if(isPending) return <SkeletonGridMovieList />
    if(error) return <p className="text-white  font-bold text-center content-center h-[50vh]">Erro : {error.message}</p> 
    

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 ">
      {data?.map(movie => (
        <Link href={`/movies/${movie.id}`} className="overflow-hidden aspect-[2/3] relative rounded group" key={movie.id}>
          <Image src={movie.poster_path} alt={movie.title ?? ""} className="object-cover object-bottom group-hover:scale-110 duration-300" fill />
        </Link>
      ))}
    </div>
  )
}

export default GridMovieList