"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import HeaderTopRatedPage from "./HeaderTopRatedPage"
import GridMovieList from "../common/GridMovieList"

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


  const handleChangeEndpoint = (val:"/movie/top_rated" | "/tv/top_rated") => {
    if(val === endpoint) return
    params.delete("year")
    if(val === "/tv/top_rated") params.set("type", "tv")
    else params.delete("type")
    router.push(`/showmore/top_rated?${params.toString()}`)
  }

  return (
    <div className="relative min-h-screen pb-28 container ">
      <HeaderTopRatedPage handleChangeEndpoint={handleChangeEndpoint}/>
      <GridMovieList endpoint={endpoint} title="" isMovie={params.get("type") !== 'tv'}/>
    </div>
  )
}

export default ClientTopRatedPage