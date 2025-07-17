"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import 'swiper/css';
import "swiper/css/pagination"

const endpoint = "/movie/popular"

const Banner = () => {

    const { data, isLoading, error } = useMovieQuery(endpoint, ["movies", "banner"])

    if(isLoading) return <p className="text-white  font-bold text-center content-center h-[50vh]">Loading...</p>
    if(error) return <p className="text-white font-bold text-center content-center h-[50vh]">Error : {error.message}</p>

  return (
    <div className="rounded overflow-hidden mx-auto">
        <Swiper 
        modules={[Pagination, Autoplay]}
        pagination={{ clickable : true }}
        autoplay={{
            delay : 2000,
            disableOnInteraction : false,
        }}
        slidesPerView={1}
        spaceBetween={40}
        loop
        >
            {data?.map(movie => <SwiperSlide className="!h-48 bg-cover bg-center md:!h-96 lg:!h-[500px]" key={movie.id} style={{ backgroundImage : `url(${movie.backdrop_path})` }} /> )}
        </Swiper>
    </div>
  )
}

export default Banner