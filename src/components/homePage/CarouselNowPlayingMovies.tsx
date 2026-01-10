"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import SkeletonCarouselNowPlayingMovies from "../skeleton/SkeletonCarouselNowPlayingMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import "swiper/css/pagination"
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { useIsLargeScreen } from "@/lib/useIsLargeScreen";

const CarouselTrendingMovies = () => {

    const { data, isPending, isError, error } = useMovieQuery({
        endpoint : '/movie/now_playing',
        totalMoviePerRequest: 10
    })

    const isLargeScreen = useIsLargeScreen()

    if(isPending) return <SkeletonCarouselNowPlayingMovies />

    if(isError) return <p>Error : {error.message}</p>

  return (
    <div className="my-20 w-full">
        <h1 className="text-xl md:text-2xl">Now Playing</h1>
        <Swiper
            spaceBetween={12}
            modules={[Pagination]}
            slidesPerView={isLargeScreen ? 6 : 4}
            className="mt-4 lg:mt-10 "
        >
            {data?.movies.map((movie, index) => (
                <SwiperSlide key={movie.id}>
                    <div className="relative aspect-[9/16] hover:scale-110 duration-300">
                        <Image src={movie.poster_path} alt={movie.title ?? ""} fill className="object-cover object-center rounded-lg"/>
                        <span className={`absolute font-bold text-5xl bottom-2 -left-3 md:text-6xl lg:text-8xl`}>{index + 1}</span>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default CarouselTrendingMovies