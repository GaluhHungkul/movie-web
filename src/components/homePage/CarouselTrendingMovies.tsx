"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import SkeletonCarouselNowPlayingMovies from "../skeleton/SkeletonCarouselNowPlayingMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import "swiper/css/pagination"
import Image from "next/image";
import { Pagination } from "swiper/modules";

const CarouselTrendingMovies = () => {

    const { data, isPending, isError, error } = useMovieQuery({
        endpoint : '/movie/now_playing',
        totalMoviePerRequest: 10
    })

    if(isPending) return <SkeletonCarouselNowPlayingMovies />

    if(isError) return <p>Error : {error.message}</p>

  return (
    <div className="mt-20 w-full mb-20">
        <h1 className="text-xl">Now Playing</h1>
        <Swiper
            loop
            modules={[Pagination]}
            slidesPerView={4}
            className="mt-4"
        >
            {data?.movies.map((movie, index) => (
                <SwiperSlide key={movie.id} className="mx-2">
                    <div className="relative aspect-[9/16] hover:scale-110 duration-300">
                        <Image src={movie.poster_path} alt={movie.title ?? ""} fill className="object-cover object-center rounded-lg"/>
                        <span className={`absolute font-bold text-5xl bottom-2 -left-3 ${index === 0 ? "text-yellow-400" : ""}`}>{index + 1}</span>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default CarouselTrendingMovies