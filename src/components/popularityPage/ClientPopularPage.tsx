"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import SkeletonGridMovieList from "../skeleton/SkeletonGridMovieList"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import HeaderPopularityPage from "./HeaderPopularityPage"
import PopularList from "./PopularList"
import Pagination from "../common/Pagination"
import MovieNotFound from "../common/MovieNotFound"

const ClientPopularPage  = () => {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  
  const router = useRouter()
  const [endpoint, setEndpoint] = useState(searchParams.get("type") === "tv" ? "/tv/popular" : "/movie/popular")
  
  
  const { data, isPending, error } = useMovieQuery({ endpoint, page : Math.abs(Number(params.get("page"))) || 1, totalMoviePerRequest : 10})
  
  if(isPending) return <SkeletonGridMovieList />
  if(error) return <p className="text-white  font-bold text-center content-center h-[50vh]">Error : {error.message}</p> 

    
  const handleChangeEndpoint = (val:"/movie/popular" | "/tv/popular") => {
    if(val === endpoint) return
    setEndpoint(val)
    params.delete("page")
    if(val === "/tv/popular") params.set("type", "tv")
    else params.delete("type")
    router.push(`/movies/filterby/popularity?${params.toString()}`)
  }

  
  return (
    <div className="relative min-h-screen pb-28">
      <HeaderPopularityPage endpoint={endpoint} handleChangeEndpoint={handleChangeEndpoint}/>
      {data?.movies.length ?  <PopularList data={data} endpoint={endpoint}/> : <MovieNotFound /> }
      {!!data?.movies.length &&  <Pagination page={Math.abs(Number(params.get("page"))) || 1} params={params} isNextPage={data?.isNextPage} />}
    </div>
  )
}

export default ClientPopularPage