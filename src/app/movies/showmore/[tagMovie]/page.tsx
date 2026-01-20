import GridMovieList from '@/components/common/GridMovieList'
import Banner from '@/components/common/Banner'
import { redirect } from 'next/navigation'
import { FC } from 'react'

type TypeTagMovie = "now_playing" | "upcoming"

type Props = {
  params : Promise<{ tagMovie : TypeTagMovie }>
}

const validTagMovie : TypeTagMovie[] = ["now_playing", "upcoming"]

const ShowMoreMovieByTag : FC<Props>= async (props) => {

  const params = await props.params

  const { tagMovie } = params

  if(!validTagMovie.includes(tagMovie)) redirect("/movies/showmore/now_playing")    

  return (
    <div>
      <h1 className='capitalize text-center mb-6 font-bold text-2xl'>{tagMovie.toString().replaceAll("_", " ")} Movies</h1>
      <Banner endpoint={`/movie/${tagMovie}`}/>
      <GridMovieList endpoint={`/movie/${tagMovie}`} title={`${tagMovie.toString().replaceAll("_", " ")} Movies`}/>      
    </div>
  )
}

export default ShowMoreMovieByTag