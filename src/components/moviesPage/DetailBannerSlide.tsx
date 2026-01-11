import { TypeMovie } from '@/types/types-movie'
import { Button } from '../ui/button'
import { Play, Plus, ThumbsUp } from 'lucide-react'

const DetailBannerSlide = ({ title, overview }: TypeMovie) => {
  return (
    <div className="absolute pb-20 px-4 z-20 items-center justify-end flex flex-col h-full ">
        <h1 className='text-3xl'>{title}</h1>
        <p className='text-center font-semibold line-clamp-2 text-gray-300 mt-2'>{overview}</p>
        <section className='flex gap-2 mt-10'>
            <Button className='cursor-pointer bg-my-primary' onClick={() => alert(123)}><Play strokeWidth={4}/> <h1>Play Now</h1></Button>
            <Button className='cursor-pointer'><Plus strokeWidth={4}/></Button>
            <Button className='cursor-pointer'><ThumbsUp strokeWidth={4}/></Button>
        </section>
    </div>
  )
}

export default DetailBannerSlide