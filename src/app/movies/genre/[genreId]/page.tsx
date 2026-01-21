import GridMovieListByGenre from "@/components/genreIdPage/GridMovieListByGenre"
import { movieGenres } from "@/lib/data/genres"
import { redirect } from "next/navigation"
import { FC } from "react"

type Props = {
  params : Promise<{ genreId : string }>;
}

const MoviesByGenrePage : FC<Props> = async ({ params }) => {

  const { genreId } = await params
  const genre = movieGenres.find(genre => genre.id === Number(genreId))
  if(!genre) redirect("/")

  return (
    <div className="container">
      <h1 className="text-center font-bold text-xl my-10 lg:text-2xl">{genre.name}</h1>
      <GridMovieListByGenre genreId={genre.id} />
    </div>
  )
}

export default MoviesByGenrePage