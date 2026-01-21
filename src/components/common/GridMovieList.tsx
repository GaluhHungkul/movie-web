"use client"

import { useInfiniteMovieQuery } from "@/lib/api/getMovies"
import { FC, useEffect, useMemo } from "react"
import SkeletonGridMovieList from "../skeletons/SkeletonGridMovieList"
import MovieCard from "./MovieCard"
import { useSearchParams } from "next/navigation"
import { useInView } from "react-intersection-observer"
import { Spinner } from "../ui/spinner"
import SelectReleaseYear from "../topRatedPage/SelectReleaseYear"

type Props = {
  endpoint : string
  isMovie? : boolean
  title?: string
  popular?: boolean
}

const GridMovieList : FC<Props> = ({ endpoint, isMovie=true, title="Movies", popular=false }) => {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const yearParams = params.get("year")

  const realEndpoint = useMemo(() => {
    if(!popular || !yearParams) return endpoint
    if(!isMovie) return `/discover/tv?sort_by=popularity.desc&first_air_date.gte=${yearParams}-01-01&first_air_date.lte=${yearParams}-12-31`
    return `/discover/${isMovie ? "movie" : "tv"}?sort_by=popularity.desc&primary_release_date.gte=${yearParams}-01-01&primary_release_date.lte=${yearParams}-12-31`

  },[endpoint, popular, isMovie, yearParams])

  const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteMovieQuery({ endpoint: realEndpoint, page : Math.abs(Number(params.get("page"))) || 1, totalMoviePerRequest: 12 })

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
      <h1 className="text-xl capitalize">{title}</h1>
      {popular && <SelectReleaseYear />}
      {movies.length 
      ? 
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie, index) => <MovieCard movie={movie} key={`${movie.id}-${index}`} isMovie={isMovie}/>)}
          </div>
          <div ref={ref} className="h-10" />
          {isFetchingNextPage && <Spinner className="mt-10 size-8 mx-auto"/>}
        </div>
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