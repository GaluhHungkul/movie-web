import { TypeMovie } from "@/types/types-movie"
import { Button } from "../ui/button"
import Link from "next/link"
import { Bookmark, Star } from "lucide-react"

const MovieDescription = ({ descriptionMovie, isMovie } : { descriptionMovie : TypeMovie | undefined, isMovie : boolean }) => {
  console.log(descriptionMovie)
  return (
    <div className="mt-10 space-y-3 md:text-xl md:mt-0 md:flex-1 lg:flex-2">
      <div className="flex justify-between items-center">
        <h1 className="text-my-primary text-2xl">{descriptionMovie?.title}</h1>
        <Button variant={"secondary"} title="Add to your list"><Bookmark /></Button>
      </div>
      <h1 className="text-white/70 text-sm mb-8">{descriptionMovie?.tagline ?? ""}</h1>
      <section className="flex gap-2 items-center">
        <h1 className="text-white/70">{descriptionMovie?.release_date ?? descriptionMovie?.first_air_date}</h1>
        <span>|</span>
        <h2 className="flex items-center gap-2">{descriptionMovie?.vote_average} <Star className="text-my-primary" size={16}/></h2>
      </section>
      {descriptionMovie?.runtime ? 
      <h1 className="mb-8">Duration : <span className="text-white/70">{(() => {
          const runtime = descriptionMovie?.runtime ?? 0
          const hours = Math.floor(runtime / 60) > 0 ? `${Math.floor(runtime / 60) } H` : ""
          const minutes = runtime % 60 > 0 ? `${runtime % 60} M` : ""
          return `${hours} ${minutes}`
        })()}
      </span></h1>
      : <div className="my-6 space-y-1">
          <h1>Total Episodes : <span className="text-muted-foreground">{descriptionMovie?.number_of_episodes}</span></h1>
          <h1>Total Seasons : <span className="text-muted-foreground">{descriptionMovie?.number_of_seasons}</span></h1>
        </div>}
      <h2 className="text-white/70 line-clamp-6">{descriptionMovie?.overview}</h2>
      <h1 className="my-8">Popularity points: <span className="text-white/70">{descriptionMovie?.popularity}</span></h1>
      <h1>Genres</h1>
      <h1 className="text-white/70 flex flex-wrap gap-2">{descriptionMovie?.genres?.map(genre => <Button variant={"secondary"} className="cursor-pointer font-bold"  key={genre.id}>
        <Link href={`/${isMovie ? "movies" : "tv"}/genre/${genre.id}`}>{genre.name}</Link>
      </Button>)}</h1>
    </div>
  )
}

// 

export default MovieDescription