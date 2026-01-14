"use client"

import { useBannerQuery } from "@/lib/api/getMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import SkeletonBanner from "../skeleton/SkeletonBanner";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsLargeScreen } from "@/lib/useIsLargeScreen";
import BannerSlideContent from "./BannerSlideContent";
import BannerPagination from "./BannerPagination";

import 'swiper/css';


type Props = {
  tv?: boolean
}

const Banner = ({ tv=false } : Props) => {

  const { data, isPending, error } = useBannerQuery({ 
    endpoint : `/${tv ? 'tv' : 'movie'}/popular`,
  })
  
  const [swiperInstance, setSwiperInstance] = useState<SwiperType>(null!);
  const [activeIndex, setActiveIndex] = useState(0)
  
  const isLargeScreen = useIsLargeScreen(768)

  if(isPending) return <SkeletonBanner />
  if(error) return <p className="text-white font-bold text-center content-center h-[50vh]">Error : {error.message}</p>

  return (
    <div className="rounded overflow-hidden mx-auto relative ">
        <Swiper 
          onSwiper={setSwiperInstance}
          modules={[Autoplay, Navigation]}
          pagination={{ clickable : true }}
          navigation={{
            prevEl: "#prevEl",
            nextEl: "#nextEl"
          }}
          autoplay={{
              delay : 2000,
              disableOnInteraction : false,
          }}
          slidesPerView={1}
          spaceBetween={40}
          loop
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
          }}
        >
          <Button id="prevEl" className="absolute z-[20] cursor-pointer left-4 top-1/2 -translate-y-1/2"><ChevronLeft strokeWidth={4}/></Button>
          <Button id="nextEl" className="absolute z-[20] cursor-pointer right-4 top-1/2 -translate-y-1/2"><ChevronRight strokeWidth={4}/></Button>
          {/* gradient overlay  */}
          <div className="absolute inset-x-0 h-20 bottom-0  bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          {/* gradient overlay  */}
          {data?.movies.map(movie => (
            <SwiperSlide className="aspect-[9/16] relative md:aspect-[3/2] lg:aspect-[2/1]" key={movie.id}>
              <BannerSlideContent movie={movie} img={movie[isLargeScreen ? 'backdrop_path' : 'poster_path']}/>
            </SwiperSlide>
          ))}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            <BannerPagination activeIndex={activeIndex} length={data?.movies.length ?? 5} onClick={(index) => {
              swiperInstance.slideToLoop(index)
              setActiveIndex(index);
            }} />
          </div>
        </Swiper>
    </div>
  )
}

export default Banner