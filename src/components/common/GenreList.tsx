"use client"

import { useOneTypeGenreQuery } from "@/lib/api/getGenres"
import Link from "next/link"
import SkeletonGenreList from "../skeleton/SkeletonGenreList"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { movieGenreImages, tvGenreImages } from "@/lib/data/genres"

const GenreList = ({ tv=false } : { tv?: boolean }) => {

    const { data, isPending, isError, error } = useOneTypeGenreQuery(tv ? "tv" : "movie")

    if(isPending) return <SkeletonGenreList />
    if(isError) return <p>Error : {error.message}</p>

    const images = tv ? tvGenreImages : movieGenreImages

  return (
    <div className="pb-10">
        <h1 className="text-center my-5 text-xl md:text-2xl md:my-10">{tv ? "TV" : "Movie"} Genres</h1>
        <div className="grid grid-cols-2 gap-4 font-medium text-lg md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {data.genres.map((genre, index) => (
                <Link title={genre.name} key={genre.id} href={`/${tv ? "tv" : "movies"}/genre/${genre.id}`} className="" >
                    <Card>
                        <CardContent className="aspect-square grid grid-cols-2 gap-1">
                            {images[index].map((img, i) => (
                                <div key={i} className="relative">
                                    <Image src={img} alt={`${tv ? "tv" : "movie"}-${genre.id}`} fill sizes="100vw" className="object-cover object-center rounded"/>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="flex items-center gap-2 justify-between">
                            <p className="font-semibold">{genre.name}</p>
                            <Button variant={"outline"}><ArrowRight /></Button>
                        </CardFooter>
                    </Card>
                </Link>
            ))}        
        </div>
    </div>
  )
}

export default GenreList