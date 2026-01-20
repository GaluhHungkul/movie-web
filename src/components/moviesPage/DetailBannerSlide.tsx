import { TypeMovie } from '@/types/types-movie'
import { Button } from '../ui/button'
import { Play, Plus, ThumbsUp } from 'lucide-react'

const DetailBannerSlide = ({ title, overview }: TypeMovie) => {
  return (
    <div className="absolute pb-20 px-4 z-20 items-center flex flex-col bottom-0 md:pb-16">
        <h1 className='text-3xl md:text-4xl'>{title}</h1>
        <p className='text-center font-semibold line-clamp-2 text-gray-300 mt-2 md:text-lg'>{overview}</p>
        <section className='flex gap-2 mt-10'>
          <Button className='cursor-pointer md:mr-8'><Play strokeWidth={4}/> <h1>Play Now</h1></Button>
          <Button variant={"secondary"} className='cursor-pointer'><Plus strokeWidth={4}/></Button>
          <Button variant={"secondary"} className='cursor-pointer'><ThumbsUp strokeWidth={4}/></Button>
        </section>
    </div>
  )
}

export default DetailBannerSlide