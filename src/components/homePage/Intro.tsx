"use client"

import Image from 'next/image';
import { Typewriter } from "react-simple-typewriter";
import { Button } from '../ui/button';

const Intro = () => {
  return (
    <div className='flex flex-col items-center min-h-screen w-screen pt-32 md:pt-40 relative '>
        <Image src={"/assets/images/hero-bg-img.png"} alt='Hero Background' fill sizes='100vw' className='relative z-[-1] object-cover object-center'/>
        <h1 className="text-3xl text-foreground text-center md:text-4xl lg:text-5xl">
          <Typewriter
            words={["Stream Everything You Love, Instantly"]}
            // loop
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="text-center text-sm text-foreground font-medium mt-6 md:text-xl lg:text-2xl">Unlimited movies. Endless shows. Zero waiting. StreamVibe puts thousands of titles at your fingertips-new releases, classics, and everything in between. Create custom watchlists, stream on any device, and dive into your next favorite story whenever inspiration strikes.</p>
        <Button className='mt-12 cursor-pointer md:scale-125 md:font-bold'>Start Watching Now</Button>
    </div>
  )
}

export default Intro