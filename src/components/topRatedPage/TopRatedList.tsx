import Image from "next/image"
import Link from "next/link"
import DetailTopRated from "./DetailTopRated"
import { TypeMovie } from "@/types/types-movie"
import { FC } from "react"

type Props = {
    data : TypeMovie[]
    endpoint : string
}

const TopRatedList : FC<Props> = ({ data, endpoint }) => {

    console.log(data[0])
  return (
    <div className="flex flex-col gap-2 lg:w-4/5 mx-auto">
        {data.map((movie) => (            
            <Link href={`/${endpoint.includes("movie") ? "movies" : "tv"}/detail/${movie.id}`} key={movie.id} className="w-full relative flex group rounded overflow-hidden">
                <Image src={movie.poster_path} width={500} height={300} alt={movie.title ?? ""} className="w-32 md:w-80"/>
                <DetailTopRated data={movie} isMovie={endpoint === "/movie/top_rated"}/>
            </Link>
        ))}
    </div>
  )
}

export default TopRatedList