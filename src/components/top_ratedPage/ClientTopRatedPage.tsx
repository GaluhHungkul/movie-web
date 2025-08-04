"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import HeaderTopRatedPage from "./HeaderTopRatedPage"
import TopRatedList from "./TopRatedList"
import Pagination from "../common/Pagination"
import MovieNotFound from "../common/MovieNotFound"
import SkeletonPopularList from "../skeleton/SkeletonPopularList"

const ClientTopRatedPage  = () => {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  
  const router = useRouter()
  const [endpoint, setEndpoint] = useState(searchParams.get("type") === "tv" ? "/tv/top_rated" : "/movie/top_rated")
  
  
  const { data, isPending, error } = useMovieQuery({ endpoint, page : Math.abs(Number(params.get("page"))) || 1, totalMoviePerRequest : 10})
  
  if(isPending) return <SkeletonPopularList />
  if(error) return <p className="text-white  font-bold text-center content-center h-[50vh]">Error : {error.message}</p> 

    
  const handleChangeEndpoint = (val:"/movie/top_rated" | "/tv/top_rated") => {
    if(val === endpoint) return
    setEndpoint(val)
    params.delete("page")
    if(val === "/tv/top_rated") params.set("type", "tv")
    else params.delete("type")
    router.push(`/filterby/top_rated?${params.toString()}`)
  }

  
  return (
    <div className="relative min-h-screen pb-28">
      <HeaderTopRatedPage endpoint={endpoint} handleChangeEndpoint={handleChangeEndpoint}/>
      {data?.movies.length ?  <TopRatedList data={data} endpoint={endpoint}/> : <MovieNotFound /> }
      {!!data?.movies.length &&  <Pagination page={Math.abs(Number(params.get("page"))) || 1} params={params} isNextPage={data?.isNextPage} />}
    </div>
  )
}

export default ClientTopRatedPage