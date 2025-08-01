import GridMovieList from '@/components/common/GridMovieList'
import { redirect } from 'next/navigation'
import React, { FC } from 'react'

type TypeTagMovie = "popular" | "top_rated" | "upcoming"

type Props = {
  params : Promise<{ tagMovie : TypeTagMovie }>
}

const validTagMovie : TypeTagMovie[] = ["popular", "top_rated", "upcoming"]

const ShowMoreByTagMovie : FC<Props>= async (props) => {

  const params = await props.params

  const { tagMovie } = params

  if(!validTagMovie.includes(tagMovie)) redirect("/movies/showmore/popular")    

  return (
    <div>
      <h1 className='capitalize text-center mb-6 font-bold text-2xl'>{tagMovie.toString().replaceAll("_", " ")} Movies</h1>
      <GridMovieList endpoint={`/movie/${tagMovie}`}/>      
    </div>
  )
}

export default ShowMoreByTagMovie