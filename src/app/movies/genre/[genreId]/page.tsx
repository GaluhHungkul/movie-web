import GridMovieList from "@/components/common/GridMovieList"

const MoviesByGenrePage = ({ params : { genreId }} : { params : { genreId : string } }) => {

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10">Genre Id {genreId}</h1>
      <GridMovieList endpoint={`/discover/movie?with_genres=${genreId}`}/>
    </div>
  )
}

export default MoviesByGenrePage