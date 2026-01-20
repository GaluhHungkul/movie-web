"use client"

import { fadeInUp } from '@/lib/data/animation';
import { motion } from 'framer-motion';
import { ReactNode } from 'react'


const MutedText = ({ children, className } : { children: ReactNode; className?: string }) => {


  return (
    <motion.p
      variants={fadeInUp}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true }}
      className={`${className} text-sm mb-8 text-muted-foreground font-medium`}
    >
      {children}
    </motion.p>
  )
}

export default MutedText