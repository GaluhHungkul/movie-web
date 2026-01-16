"use client"

import { useGenresQuery } from "@/lib/api/getGenres"
import Link from "next/link"
import SkeletonGenreList from "../skeleton/SkeletonGenreList"

const GenreList = ({ tv=false } : { tv?: boolean }) => {

    const { data, isPending, isError, error } = useGenresQuery(tv ? "tv" : "movie")

    if(isPending) return <SkeletonGenreList />
    if(isError) return <p>Error : {error.message}</p>

  return (
    <div className="pb-10 min-h-screen">
        <h1 className="text-center my-5 text-xl md:text-2xl md:my-10">{tv ? "TV" : "Movie"} Genres</h1>
        <div className="grid grid-cols-2 gap-4 font-medium text-lg md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {data.genres.map(genre => (
                <Link href={`/${tv ? "tv" : "movies"}/genre/${genre.id}`} className="border rounded text-center content-center py-4 hover:bg-gray-100/10 hover:underline lg:py-6" key={genre.id}>{genre.name}</Link>
            ))}        
        </div>
    </div>
  )
}

export default GenreList