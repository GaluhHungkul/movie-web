"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import 'swiper/css';
import "swiper/css/pagination"
import "swiper/css/navigation"
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
    title : string;
    href : string;
    endpoint : {
        type : string;
        category : string;
    };
}

const SwiperMovieList : FC<Props> = ({ title, href, endpoint }) => {

    const { data, isLoading, error } = useMovieQuery(endpoint)

    if(isLoading) return <p className="text-white  font-bold text-center content-center h-[50vh]">Loading...</p>
    if(error) return <p className="text-white font-bold text-center content-center h-[50vh]">Error : {error.message}</p>

  return (
    <div className="rounded overflow-hidden px-2 w-full  mb-6 mx-auto ">
        <header className="flex justify-between items-center mb-4 lg:mb-8">  
            <h1 className="font-bold text-white lg:text-2xl">{title}</h1>
            <Link href={href} className="hover:underline text-white/80 text-sm lg:text-base">Show More</Link>
        </header>
        <Swiper 
        modules={[Navigation, Pagination]}
        pagination={{ clickable : true }}
        autoplay={{
            delay : 2000,
            disableOnInteraction : false,
        }}
        spaceBetween={10}
        navigation
        slidesPerView="auto"
        loop
        >
            {data?.map(movie => (
                <SwiperSlide key={movie.id} className="!w-28 lg:!w-60 ">
                    <Image src={movie.poster_path} alt={movie.title ?? movie.name ?? ""} width={900} height={500} />
                </SwiperSlide> 
            ))}
        </Swiper>
    </div>
  )
}

export default SwiperMovieList