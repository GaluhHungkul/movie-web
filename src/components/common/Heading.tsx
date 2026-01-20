"use client"

import { splitTextContainer, splitTextWord } from '@/lib/data/animation';
import { motion } from 'framer-motion';
import { ReactNode } from 'react'


const Heading = ({ children, className } : { children: ReactNode; className?: string }) => {

  const words = children?.toString().split(" ")

  return (
    <motion.h1 
      variants={splitTextContainer}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className={`${className} text-2xl mb-2 text-foreground`}
    >
      {words?.map((w, i) => 
        <motion.span variants={splitTextWord} className='mr-2 inline-block' key={i}>{w}</motion.span>
      )}
    </motion.h1>
  )
}

export default Heading