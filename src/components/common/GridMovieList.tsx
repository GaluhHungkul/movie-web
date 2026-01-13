"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { FC } from "react"
import SkeletonGridMovieList from "../skeleton/SkeletonGridMovieList"
import MovieCard from "./MovieCard"
import Pagination from "./Pagination"
import { useSearchParams } from "next/navigation"

type Props = {
  endpoint : string
  isMovie? : boolean
  title?: string
}

const GridMovieList : FC<Props> = ({ endpoint, isMovie=true, title="Movies" }) => {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const { data, isPending, error } = useMovieQuery({ endpoint, page : Math.abs(Number(params.get("page"))) || 1, totalMoviePerRequest: 10 })
  
  if(isPending) return <SkeletonGridMovieList />
  if(error) return <p className="text-white  font-bold text-center content-center h-[50vh]">Error : {error.message}</p> 
    

  return (
    <div className="relative min-h-screen pb-28 mt-8">
      <h1 className="mb-6 text-xl">{title}</h1>
      {data?.movies.length 
      ? 
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {data?.movies.map(movie => <MovieCard movie={movie} key={movie.id} isMovie={isMovie}/>)}
        </div>
      :
        <h1 className="text-center h-[60vh]  justify-center content-center flex flex-col text-xl">
          <span>Movie not found</span>
          <span className="text-6xl">404</span>
        </h1>
      }
      {!!data?.movies.length &&  <Pagination page={Math.abs(Number(params.get("page"))) || 1} params={params} isNextPage={data?.isNextPage} />}
    </div>
  )
}

export default GridMovieList