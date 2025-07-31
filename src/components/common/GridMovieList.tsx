"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { FC, useState } from "react"
import SkeletonGridMovieList from "../skeleton/SkeletonGridMovieList"
import MovieCard from "./MovieCard"
import Pagination from "./Pagination"

type Props = {
  endpoint : string
}

const GridMovieList : FC<Props> = ({ endpoint }) => {

  const [page, setPage] = useState<number>(1)

  const { data, isPending, error } = useMovieQuery({ endpoint, page })
  
  if(isPending) return <SkeletonGridMovieList />
  if(error) return <p className="text-white  font-bold text-center content-center h-[50vh]">Erro : {error.message}</p> 
    

  return (
    <div className="relative min-h-screen">
      {data?.movies.length 
      ? 
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {data?.movies.map(movie => <MovieCard movie={movie} key={movie.id}/>)}
        </div>
      :
        <h1 className="text-center h-[60vh]  justify-center content-center flex flex-col text-xl">
          <span>Movie not found</span>
          <span className="text-6xl">404</span>
        </h1>
      }
      {!!data?.movies.length &&  <Pagination page={page} setPage={setPage} isNextPage={data?.isNextPage}/>}
    </div>
  )
}

export default GridMovieList