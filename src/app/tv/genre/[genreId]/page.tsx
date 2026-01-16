import GridMovieListByGenre from "@/components/genreIdPage/GridMovieListByGenre"
import { TvGenres } from "@/lib/data/genres"
import { redirect } from "next/navigation"


const TvByGenrePage  = async (props : { params : Promise<{ genreId : string }> }) => {

  const params = await props.params
  const genre = TvGenres.find(genre => genre.id === Number(params.genreId))
  if(!genre) redirect("/")

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10 lg:text-2xl">{genre.name}</h1>
      <GridMovieListByGenre genreId={genre.id} isMovie={false} />
    </div>
  )
}

export default TvByGenrePage