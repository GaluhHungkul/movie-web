import { TypeMovie } from "@/types/types-movie"
import Image from "next/image"
import Link from "next/link"

const MovieCard = ({ movie, className, isMovie } : { movie : TypeMovie, className? : string, isMovie? : boolean }) => {
  
  return (
    <Link href={`/${isMovie ? "movies" : "tv"}/detail/${movie.id}`} className={`group overflow-hidden aspect-[2/3] relative rounded group ${className}`} key={movie.id}>
      <Image src={movie.poster_path} alt={movie.title ?? ""} className="object-cover object-bottom group-hover:scale-110 duration-300 group-hover:brightness-40" fill sizes="25vw"/>
      <div className="absolute p-2 bottom-0 w-full translate-y-full group-hover:translate-y-0 duration-300 group-hover:block ">
        <h1 className="line-clamp-1">{movie.title}</h1>
        <h1>{movie.vote_average.toFixed(1)} / 10 ⭐</h1>
      </div>
    </Link>
  )
}

export default MovieCard