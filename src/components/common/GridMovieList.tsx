"use client"

import { useInfiniteMovieQuery } from "@/lib/api/getMovies"
import { FC, useEffect } from "react"
import SkeletonGridMovieList from "../skeleton/SkeletonGridMovieList"
import MovieCard from "./MovieCard"
import { useSearchParams } from "next/navigation"
import { useInView } from "react-intersection-observer"
import { Spinner } from "../ui/spinner"

type Props = {
  endpoint : string
  isMovie? : boolean
  title?: string
}

const GridMovieList : FC<Props> = ({ endpoint, isMovie=true, title="Movies" }) => {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteMovieQuery({ endpoint, page : Math.abs(Number(params.get("page"))) || 1, totalMoviePerRequest: 12 })
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  })

   useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if(isPending) return <SkeletonGridMovieList />
  if(error) return <p className="text-white  font-bold text-center content-center h-[50vh]">Error : {error.message}</p> 

  const movies = data?.pages.flatMap(page => page?.movies ?? []) ?? []
  return (
    <div className="relative min-h-screen pb-28 mt-8 flex flex-col">
      <h1 className="mb-6 text-xl">{title}</h1>
      {movies.length 
      ? 
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie, index) => <MovieCard movie={movie} key={`${movie.id}-${index}`} isMovie={isMovie}/>)}
          </div>
          <div ref={ref} className="h-10" />
          {isFetchingNextPage && <Spinner className="mt-10 size-8 mx-auto"/>}
        </>
      :
        <h1 className="text-center h-[60vh]  justify-center content-center flex flex-col text-xl">
          <span>Movie not found</span>
          <span className="text-6xl">404</span>
        </h1>
      }
    </div>
  )
}

export default GridMovieList