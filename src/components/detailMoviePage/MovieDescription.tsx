import { TypeMovie } from "@/types/types-movie"
import { Button } from "../ui/button"
import Link from "next/link"
import { Star } from "lucide-react"

const MovieDescription = ({ descriptionMovie, isMovie } : { descriptionMovie : TypeMovie | undefined, isMovie : boolean }) => {

  return (
    <div className="w-full mt-10 space-y-3 md:text-xl lg:mt-0 lg:hidden">
      <h1 className="text-my-primary text-2xl md:hidden">{descriptionMovie?.title}</h1>
      <h1 className="text-white/70 text-sm mb-8 md:hidden">{descriptionMovie?.tagline ?? ""}</h1>
      <section className="flex gap-2 items-center md:hidden">
        <h1 className="text-white/70">{descriptionMovie?.release_date}</h1>
        <span>|</span>
        <h2 className="flex items-center gap-2">{descriptionMovie?.vote_average} <Star className="text-my-primary" size={16}/></h2>
      </section>
      <h1 className="mb-8 md:hidden">Duration : <span className="text-white/70">{(() => {
          const runtime = descriptionMovie?.runtime ?? 0
          const hours = Math.floor(runtime / 60)
          const minutes = runtime % 60
          return `${hours}H ${minutes}M`
        })()}
      </span></h1>
      <h2 className="text-white/70">{descriptionMovie?.overview}</h2>
      <h1 className="my-8">Popularity : <span className="text-white/70">{descriptionMovie?.popularity}</span></h1>
      <h1 className="text-white/70 flex flex-wrap gap-2">{descriptionMovie?.genres?.map(genre => <Button variant={"secondary"} className="cursor-pointer font-bold"  key={genre.id}>
        <Link href={`/${isMovie ? "movies" : "tv"}/genre/${genre.id}`}>{genre.name}</Link>
      </Button>)}</h1>
    </div>
  )
}

// 

export default MovieDescription