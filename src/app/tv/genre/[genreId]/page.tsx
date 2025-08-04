import GridMovieList from "@/components/common/GridMovieList"
import { TvGenres } from "@/lib/data/genres"
import { redirect } from "next/navigation"


const TvByGenrePage  = async (props : { params : Promise<{ genreId : string }> }) => {

  const params = await props.params
  const genre = TvGenres.find(genre => genre.id === Number(params.genreId))
  if(!genre) redirect("/")

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10">{genre.name}</h1>
      <GridMovieList endpoint={`/discover/tv?with_genres=${params.genreId}`} isMovie={false}/>
    </div>
  )
}

export default TvByGenrePage