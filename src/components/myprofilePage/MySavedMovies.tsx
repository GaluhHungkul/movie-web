import GridMovieList from "@/components/common/GridMovieList"

const MySavedMovies = () => {
  return (
    <div>
        <GridMovieList endpoint="/movie/popular"/>
    </div>
  )
}

export default MySavedMovies