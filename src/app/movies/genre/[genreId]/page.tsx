import GridMovieList from "@/components/common/GridMovieList"

type PageProps = {
  params: {
    genreId: string;
  };
}

const MoviesByGenrePage  = async ({ params : { genreId }} : PageProps) => {

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10">Genre Id {genreId}</h1>
      <GridMovieList endpoint={`/discover/movie?with_genres=${genreId}`}/>
    </div>
  )
}

export default MoviesByGenrePage