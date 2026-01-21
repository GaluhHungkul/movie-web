import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeletonSwiperMovieList = () => {
  return (
    <div className='my-10 overflow-hidden'>
        <section className='flex justify-between px-1 mb-4 md:px-0'>
            <Skeleton className='h-2 w-32 md:h-4 md:w-40 lg:h-6 lg:w-64'/>
            <Skeleton className='h-2 w-20 md:h-4 md:w-36 lg:h-6 lg:w-48'/>
        </section>
        <section className="gap-4 flex h-48 md:h-64 lg:h-80">
            {Array(8).fill(null).map((_,i) => (
                <Skeleton key={i} className='aspect-[2/3]'/>
            ))}
        </section>
    </div>
  )
}

export default SkeletonSwiperMovieList