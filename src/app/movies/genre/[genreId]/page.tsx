import GridMovieList from "@/components/common/GridMovieList"
import { genres } from "@/lib/data/genres"
import { redirect } from "next/navigation"


const MoviesByGenrePage  = async (props : { params : Promise<{ genreId : string }> }) => {

  const params = await props.params
  const genre = genres.find(genre => genre.id === Number(params.genreId))
  if(!genre) redirect("/")

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10">{genre.name}</h1>
      <GridMovieList endpoint={`/discover/movie?with_genres=${params.genreId}`}/>
    </div>
  )
}

export default MoviesByGenrePage