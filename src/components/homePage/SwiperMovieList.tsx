"use client"

import { useMovieQuery } from "@/lib/api/getMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"

import 'swiper/css';
import "swiper/css/pagination"
import "swiper/css/navigation"
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import SkeletonSwiperMovieList from "../skeleton/SkeletonSwiperMovieList";
import BannerPagination from "../common/BannerPagination";
import { Swiper as SwiperType } from "swiper/types"
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    title : string;
    href : string;
    endpoint : string;
    reverse? : boolean
    tv?: boolean
}

const SwiperMovieList : FC<Props> = ({ title, href, endpoint, reverse=false, tv=false }) => {

    const { data, isPending, error } = useMovieQuery({ endpoint, totalMoviePerRequest : 8})

    const [swiperInstance, setSwiperInstance] = useState<SwiperType>(null!);
    const [activeIndex, setActiveIndex] = useState(0)
   
    if(isPending) return <SkeletonSwiperMovieList />
    if(error) return <p className="text-white font-bold text-center content-center h-[50vh]">Error : {error.message}</p>

  return (
    <div className="rounded relative overflow-hidden px-2 w-full mb-6 mx-auto pb-6">
        <header className="flex justify-between items-center mb-4">  
            <h1 className="font-bold text-white md:text-xl lg:text-2xl">{title}</h1>
            <Link href={href} className="hover:underline text-white/80 text-sm md:text-base">Show More</Link>
        </header>
        <Swiper 
        onSwiper={setSwiperInstance}
        modules={[Autoplay, Navigation]}
        navigation={{
            prevEl: "#prevEl",
            nextEl: "#nextEl",
        }}
        autoplay={{
            delay : 2000,
            disableOnInteraction : false,
            reverseDirection : reverse,
            pauseOnMouseEnter: true
        }}
        spaceBetween={10}
        slidesPerView={"auto"}
        onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
        }}
        loop
        >
            <Button id="prevEl" variant={"secondary"} className="absolute z-[20] cursor-pointer left-4 top-1/2 -translate-y-1/2"><ChevronLeft strokeWidth={4}/></Button>
            <Button id="nextEl" variant={"secondary"} className="absolute z-[20] cursor-pointer right-4 top-1/2 -translate-y-1/2"><ChevronRight strokeWidth={4}/></Button>
          
            {data?.movies.map(movie => (
                <SwiperSlide key={movie.id} className="!w-28 md:!w-40 lg:!w-60">
                    <Link href={`/${tv ? "tv" : "movies"}/detail/${movie.id}`}>
                        <Image src={movie.poster_path} alt={movie.title ?? ""} width={900} height={500} />
                    </Link>
                </SwiperSlide> 
            ))}
        </Swiper>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            <BannerPagination length={data?.movies.length ?? 10} activeIndex={activeIndex} onClick={(index) => {
                swiperInstance.slideToLoop(index)
                setActiveIndex(index);
            }}/>
        </div>
    </div>
  )
}

export default SwiperMovieList