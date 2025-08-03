import { TypeMovie } from "@/types/types-movie"
import Image from "next/image"
import Link from "next/link"

const MovieCard = ({ movie } : { movie : TypeMovie }) => {
  return (
    <Link href={`/movies/detail/${movie.id}`} className="overflow-hidden aspect-[2/3] relative rounded group" key={movie.id}>
        <Image src={movie.poster_path} alt={movie.title ?? ""} className="object-cover object-bottom group-hover:scale-110 duration-300" fill sizes="25vw"/>
    </Link>
  )
}

export default MovieCard