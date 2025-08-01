import GridMovieList from "@/components/common/GridMovieList"
import { movieGenres } from "@/lib/data/genres"
import { redirect } from "next/navigation"
import { FC } from "react"

type Props = {
  params : Promise<{ genreId : string }>
}

const MoviesByGenrePage : FC<Props> = async (props) => {

  const params = await props.params
  const genre = movieGenres.find(genre => genre.id === Number(params.genreId))
  if(!genre) redirect("/")

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10">{genre.name}</h1>
      <GridMovieList endpoint={`/discover/movie?with_genres=${params.genreId}`}/>
    </div>
  )
}

export default MoviesByGenrePage