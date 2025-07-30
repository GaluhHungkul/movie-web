"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

import 'swiper/css';
import "swiper/css/pagination"
import "swiper/css/navigation"
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import SkeletonSwiperMovieList from "../skeleton/SkeletonSwiperMovieList";

type Props = {
    title : string;
    href : string;
    endpoint : string;
    isReverse : boolean
}

const SwiperMovieList : FC<Props> = ({ title, href, endpoint, isReverse }) => {

    const { data, isPending, error } = useMovieQuery({endpoint})

    if(isPending) return <SkeletonSwiperMovieList />
    if(error) return <p className="text-white font-bold text-center content-center h-[50vh]">Error : {error.message}</p>

  return (
    <div className="rounded overflow-hidden px-2 w-full mb-6 mx-auto">
        <header className="flex justify-between items-center mb-4">  
            <h1 className="font-bold text-white md:text-xl lg:text-2xl">{title}</h1>
            <Link href={href} className="hover:underline text-white/80 text-sm md:text-base">Show More</Link>
        </header>
        <Swiper 
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable : true }}
        autoplay={{
            delay : 2000,
            disableOnInteraction : false,
            reverseDirection : isReverse
        }}
        spaceBetween={10}
        navigation
        slidesPerView="auto"
        loop
        >
            {data?.movies.map(movie => (
                <SwiperSlide key={movie.id} className="!w-28 md:!w-40 lg:!w-60">
                    <Link href={`/movies/${movie.id}`}>
                    <Image src={movie.poster_path} alt={movie.title ?? ""} width={900} height={500} />
                    </Link>
                </SwiperSlide> 
            ))}
        </Swiper>
    </div>
  )
}

export default SwiperMovieList