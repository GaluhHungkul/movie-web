"use client"

import {  useGenresQuery } from "@/lib/api/getGenres"
import Link from "next/link"
import { FC } from "react";
import SkeletonGenreList from "../skeleton/SkeletonGenreList";

type Props = {
    title : string;
    index : number;
}

const GenreList : FC<Props>= ({ title, index }) => {

    const { data, isPending, error, isError } = useGenresQuery()
    if (isPending) return <SkeletonGenreList />
    if (isError) return <p>Error {error.message}</p>
    const genres = data[index].genres

  return (
    <div className="mb-20">
        <h1 className="text-center font-bold text-xl mb-10">{title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-y-4">
        {genres?.map((genre) => (
            <Link href={`/movies/genre/${genre.id}`} className="hover:underline text-white/80 hover:text-white md:text-lg" key={genre.id}>{genre.name}</Link>
        ))}
        </div>
    </div>
  )
}

export default GenreList