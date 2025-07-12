"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import 'swiper/css';
import "swiper/css/pagination"
import Image from "next/image";

const endpoint = {
    type : "movie",
    category : "popular"
}

const Banner = () => {

    const { data, isLoading, error } = useMovieQuery(endpoint)

    if(isLoading) return <p className="text-white  font-bold text-center content-center h-[50vh]">Loading...</p>
    if(error) return <p className="text-white font-bold text-center content-center h-[50vh]">Error : {error.message}</p>

  return (
    <div className="rounded overflow-hidden  mt-4 mx-auto ">
        <Swiper 
        modules={[Pagination, Autoplay]}
        pagination={{ clickable : true }}
        autoplay={{
            delay : 2000,
            disableOnInteraction : false,
        }}
        slidesPerView={1}
        loop
        >
            {data?.map(movie => (
                <SwiperSlide key={movie.id}>
                    <Image src={movie.backdrop_path} alt={movie.title ?? movie.name ?? ""} width={900} height={500} />
                </SwiperSlide> 
            ))}
        </Swiper>
    </div>
  )
}

export default Banner