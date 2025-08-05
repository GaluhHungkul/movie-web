import { TypeMovie } from "@/types/types-movie"
import Link from "next/link"

const MovieDescription = ({ descriptionMovie, isMovie } : { descriptionMovie : TypeMovie | undefined, isMovie : boolean }) => {
  return (
    <div className="size-full mt-10 space-y-3  md:text-xl lg:flex-1/3 lg:mt-0 lg:w-2/3">
      <h1>Title : <span className="text-white/70">{descriptionMovie?.title}</span></h1>
      <h2>Overview : <span className="text-white/70">{descriptionMovie?.overview}</span></h2>
      <h2>Rate : {descriptionMovie?.vote_average} ⭐ | {descriptionMovie?.vote_count}</h2>
      <h2>Popularity : <span className="text-white/70">{descriptionMovie?.popularity}</span></h2>
      <h2>Genre<span className="text-white/70 flex flex-wrap gap-2 mt-2">{descriptionMovie?.genres?.map(genre => <Link className="border hover:bg-white/10 rounded px-2 py-1 md:px-3 md:py-2 hover:underline" href={`/${isMovie ? "movies" : "tv"}/genre/${genre.id}`} key={genre.id}>{genre.name}</Link>)}</span></h2>
    </div>
  )
}

export default MovieDescription