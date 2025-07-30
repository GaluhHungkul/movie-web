"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import 'swiper/css';
import "swiper/css/pagination"
import Link from "next/link";
import SkeletonBanner from "../skeleton/SkeletonBanner";

const endpoint = "/movie/popular"

const Banner = () => {

    const { data, isPending, error } = useMovieQuery({ endpoint, isBanner : true })

    if(isPending) return <SkeletonBanner />
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
          {data?.movies.map(movie => (
            <SwiperSlide className="!h-48 bg-cover  relative bg-center md:!h-96 lg:!h-[500px]" key={movie.id} style={{ backgroundImage : `url(${movie.backdrop_path})` }}>
              <Link href={`/movies/${movie.id}`} className="absolute inset-0"/>
            </SwiperSlide>
          ) )}
        </Swiper>
    </div>
  )
}

export default Banner