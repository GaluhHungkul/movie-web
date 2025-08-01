import GridMovieList from "@/components/common/GridMovieList"
import { FC } from "react"

type Props = {
    searchParams : {
        query : string
    }
}

const SearchMoviePage : FC<Props> = ({ searchParams : { query } }) => {
    console.log({query})
  return (
    <div>
        <h1 className="my-5 text-sm md:text-base lg:text-xl">Results for {'"'}<span className="text-white/70">{query}</span>{'"'}</h1>
        <GridMovieList endpoint={`/search/movie?query=${query}`}/>
    </div>
  )
}

export default SearchMoviePage