"use client"

import { useInfiniteMovieQuery } from "@/lib/api/getMovies"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import HeaderTopRatedPage from "./HeaderTopRatedPage"
import TopRatedList from "./TopRatedList"
import MovieNotFound from "../common/MovieNotFound"
import SkeletonTopRated from "../skeleton/SkeletonTopRated"
import { useInView } from "react-intersection-observer"
import { Spinner } from "../ui/spinner"

const ClientTopRatedPage  = () => {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const yearParams = searchParams.get("year")

  const router = useRouter()

  const endpoint = useMemo(() => {
    const type = searchParams.get("type")
    const year = yearParams

    if (type === "tv") {
      if (!year) return "/tv/top_rated"

      return `/discover/tv?sort_by=vote_average.desc&vote_count.gte=300&first_air_date.gte=${year}-01-01&first_air_date.lte=${year}-12-31`
    }

    if (!year) return "/movie/top_rated"

    return `/discover/movie?sort_by=vote_average.desc&vote_count.gte=300&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`
  }, [searchParams, yearParams])

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px"
  })

  const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteMovieQuery({ endpoint, totalMoviePerRequest : 10 })
  
  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  },[inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if(isPending) return <SkeletonTopRated />
  if(error) return <p className="text-white  font-bold text-center content-center h-[50vh]">Error : {error.message}</p> 

    
  const handleChangeEndpoint = (val:"/movie/top_rated" | "/tv/top_rated") => {
    if(val === endpoint) return
    params.delete("year")
    if(val === "/tv/top_rated") params.set("type", "tv")
    else params.delete("type")
    router.push(`/showmore/top_rated?${params.toString()}`)
  }

  const movies = data?.pages.flatMap(page => page?.movies ?? []) ?? []
  
  return (
    <div className="relative min-h-screen pb-28 md:w-4/5 md:mx-auto">
      <HeaderTopRatedPage endpoint={endpoint} handleChangeEndpoint={handleChangeEndpoint}/>
      {movies.length ?  <TopRatedList data={movies} endpoint={endpoint}/> : <MovieNotFound /> }
      <div ref={ref} className="h-10" />
      {isFetchingNextPage && <Spinner className="mt-10 size-8 mx-auto"/>}
    </div>
  )
}

export default ClientTopRatedPage