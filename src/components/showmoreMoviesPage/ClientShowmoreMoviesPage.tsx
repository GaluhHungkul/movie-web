import GridMovieList from "../common/GridMovieList"

const ClientShowmoreMoviesPage  = ({
    slug
}: { slug: string }) => {

  return (
    <div className="relative min-h-screen pb-28 container ">
    {/* <h1 className="text-center text-xl md:text-4xl">{slug}</h1> */}
      {/* <HeaderTopRatedPage title={title} handleChangeEndpoint={handleChangeEndpoint}/> */}
      <GridMovieList endpoint={`/movie/${slug}`} title={`${slug.replaceAll("_", " ")} movies`} isMovie/>
    </div>
  )
}

export default ClientShowmoreMoviesPage