import GridMovieList from "@/components/common/GridMovieList"
import { FC } from "react"

type Props = {
  searchParams : Promise<{ query : string }>
}

const SearchMoviePage : FC<Props> = async (props) => {

  const searchParams = await props.searchParams

  return (
    <div>
        <h1 className="my-5 text-sm md:text-base lg:text-xl">Results for {'"'}<span className="text-white/70">{searchParams.query}</span>{'"'}</h1>
        <GridMovieList endpoint={`/search/movie?query=${searchParams.query}`}/>
    </div>
  )
}

export default SearchMoviePage