import { TypeMovie } from "@/types/types-movie"

const MovieDescription = ({ data } : { data : TypeMovie | null }) => {
  return (
    <div className="size-full mt-10 space-y-3 text-lg md:text-xl">
      <h1>Title : <span className="text-white/70">{data?.title}</span></h1>
      <h2>Overview : <span className="text-white/70">{data?.overview}</span></h2>
      <h2>Rate : {data?.vote_average} ⭐ | {data?.vote_count}</h2>
      <h2>Popularity point : <span className="text-white/70">{data?.popularity}</span></h2>
    </div>
  )
}

export default MovieDescription