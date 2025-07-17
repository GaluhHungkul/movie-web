import { genres } from "@/lib/data/genres"
import Link from "next/link"

const ListGenrePage = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10">Genre</h1>
      <div className="grid grid-cols-2  justify-items-center gap-y-4">
        {genres.map((genre) => (
          <Link href={`/movies/genre/${genre.id}`} className="hover:underline hover:text-white/70" key={genre.id}>{genre.name}</Link>
        ))}
      </div>
    </div>
  )
}

export default ListGenrePage