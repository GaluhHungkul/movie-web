"use client"

import Image from 'next/image';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { fadeInUp, splitTextContainer, splitTextWord } from '@/lib/data/animation';

const Intro = () => { 

  const title = "Stream Everything You Love, Instantly"

  const words = title.split(" ")

  return (
    <div className='flex flex-col items-center min-h-screen w-screen justify-end relative pb-28'>
        <Image src={"/assets/images/hero-bg-img.png"} alt='Hero Background' fill sizes='100vw' className='relative z-[-1] object-cover object-center'/>
        <motion.h1 
          variants={splitTextContainer}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="text-3xl text-foreground text-center md:text-4xl lg:text-5xl"
        >
          {words.map((w, i) => (
            <motion.span 
              variants={splitTextWord}
              key={i}
              className='mr-2 inline-block'
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p variants={fadeInUp} initial="hidden" whileInView={"show"} viewport={{ once: true }} className="text-center text-sm text-foreground font-medium mt-6 md:text-xl lg:text-2xl">Unlimited movies. Endless shows. Zero waiting. Chill puts thousands of titles at your fingertips-new releases, classics, and everything in between.</motion.p>
        <Button className='mt-8 cursor-pointer md:scale-125 md:font-bold'>Start Watching Now</Button>
    </div>
  )
}

export default Intro