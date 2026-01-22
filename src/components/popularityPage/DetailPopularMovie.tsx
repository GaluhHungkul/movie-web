import { movieGenres, tvGenres } from "@/lib/data/genres"
import { TypeMovie } from "@/types/types-movie"
import { FC } from "react"

type Props = {
    isMovie : boolean
    data :  TypeMovie 
}

const DetailMoviePopular : FC<Props> = ({ data, isMovie }) => {

    const dataGenres = isMovie ? movieGenres : tvGenres

  return (
    <section className="w-full text-sm p-3 bg-white/5 group-hover:bg-white/10 duration-300 md:text-2xl md:px-8 md:py-5">
        <h1 className="text-white mb-4 text-base md:text-3xl md:mb-6">{data?.title}</h1>
        <h2>Popularity : <span className="text-white/70">{data?.popularity.toFixed(2)}</span></h2>
        <h2 className="my-2 md:my-4">Rate : {data?.vote_average} ⭐ | {data?.vote_count}</h2>
        <p className="text-white/70 flex flex-wrap gap-2 mt-8 md:mt-10">{data?.genre_ids?.map(genreId => <span key={genreId}>{dataGenres.find(gm => gm.id === genreId)?.name  ?? "..."}</span>)}</p>
    </section>
  )
}

export default DetailMoviePopular