import { TypeMovie } from '@/types/types-movie'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DetailBannerSlide from './DetailBannerSlide'

const BannerSlideContent = ({ movie, img } : { movie: TypeMovie; img: string }) => {
  return (
    <div key={movie.id} className='relative z-20 h-full w-full '>
      <Image src={img} fill alt={movie?.title ?? ""} className="object-cover object-center"/>
      <DetailBannerSlide {...movie}/>
      <Link href={`/movies/detail/${movie.id}`} className="absolute inset-0"/>
    </div>
  )
}

export default BannerSlideContent