import AnimatedBackground from './AnimatedBackground'
import CTAButton from './CTAButton'

const Intro = () => {
  return (
    <div className='flex flex-col items-center min-h-[85vh] pt-32 md:pt-40'>
        <AnimatedBackground />
        <h1 className="text-3xl text-center md:text-4xl">Discover Your Next Favorite Movie</h1>
        <h1 className="text-center text-sm text-gray-300 mt-6 md:text-xl">Explore thousands of movies, from timeless classics to the latest blockbusters.</h1>
        <CTAButton />
    </div>
  )
}

export default Intro