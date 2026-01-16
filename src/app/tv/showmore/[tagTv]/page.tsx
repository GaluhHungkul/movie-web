import GridMovieList from '@/components/common/GridMovieList'
import Banner from '@/components/moviesPage/Banner'
import { redirect } from 'next/navigation'
import { FC } from 'react'

type TypeTagTV = "airing_today" | "on_the_air"

type Props = {
  params : Promise<{ tagTv : TypeTagTV }>
}

const validTagTV : TypeTagTV[] = ["airing_today", "on_the_air"]

const ShowMoreTvByTag : FC<Props>= async (props) => {

  const params = await props.params

  const { tagTv } = params

  if(!validTagTV.includes(tagTv)) redirect("/tv/showmore/airing_today")    

  return (
    <div>
      <h1 className='capitalize text-center mb-6 font-bold text-2xl'>{tagTv.toString().replaceAll("_", " ")} TV Series</h1>
      <Banner tv endpoint={`/tv/${tagTv}`}/>
      <GridMovieList isMovie={false} endpoint={`/tv/${tagTv}`} title={`${tagTv.toString().replaceAll("_", " ")} TV Series`}/>      
    </div>
  )
}

export default ShowMoreTvByTag