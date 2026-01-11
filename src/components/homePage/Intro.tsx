"use client"

import AnimatedBackground from './AnimatedBackground'
import CTAButton from './CTAButton'
import { Typewriter } from "react-simple-typewriter";

const Intro = () => {
  return (
    <div className='flex flex-col items-center min-h-[85vh] pt-32 md:pt-40'>
        <AnimatedBackground />
        <h1 className="text-3xl text-center md:text-4xl lg:text-5xl">
          <Typewriter
            words={["Discover Your Next Favorite Movies", "Your favorite stories, all in one place.", "Stream thousands of movies and series."]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <h1 className="text-center text-sm text-gray-300 mt-6 md:text-xl lg:text-2xl">Explore thousands of movies, from timeless classics to the latest blockbusters.</h1>
        <CTAButton />
    </div>
  )
}

export default Intro