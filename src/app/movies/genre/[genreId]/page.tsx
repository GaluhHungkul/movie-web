import GridMovieList from "@/components/common/GridMovieList"



const MoviesByGenrePage  = async (props : { params : Promise<{ genreId : string }> }) => {

  const params = await props.params

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10">Genre Id {params.genreId}</h1>
      <GridMovieList endpoint={`/discover/movie?with_genres=${params.genreId}`}/>
    </div>
  )
}

export default MoviesByGenrePage