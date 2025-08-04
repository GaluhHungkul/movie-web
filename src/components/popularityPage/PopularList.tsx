import Image from "next/image"
import Link from "next/link"
import DetailMoviePopular from "./DetailMoviePopular"
import { TypeMovie } from "@/types/types-movie"
import { FC } from "react"

type Props = {
    data : {
        movies : TypeMovie[]
    }
    endpoint : string
}

const PopularList : FC<Props> = ({ data, endpoint }) => {
  return (
    <div className="flex flex-col gap-2 lg:w-4/5 mx-auto">
        {data?.movies.map((movie) => (            
            <Link href={`/movies/detail/${movie.id}`} key={movie.id} className="w-full relative flex group rounded overflow-hidden">
                <Image src={movie.poster_path} width={500} height={300} alt={movie.title ?? ""} className="w-32 md:w-80"/>
                <DetailMoviePopular data={movie} isMovie={endpoint === "/movie/popular"}/>
            </Link>
        ))}
    </div>
  )
}

export default PopularList