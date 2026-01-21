"use client"

import Heading from "../common/Heading"
import MutedText from "../common/MutedText"
import { devicesItems } from "@/lib/data/categories"
import { Card, CardContent, CardHeader } from "../ui/card"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { staggerContainer } from "@/lib/data/animation"


const DevicesItems = () => {

    
    const childVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(5px)"
        },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0)",
        },
    }

  return (
    <div className="container">
        <Heading>Your Entertainment, Every Screen</Heading>
        <MutedText>Stream seamlessly across all your devices smartphone, tablet, laptop, smart TV, and more. Chill moves with you, delivering flawless playback whether you&apos;re commuting, relaxing at home, or on the go. Never miss a scene, no matter where life takes you</MutedText>
        <motion.section 
            variants={staggerContainer}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true }}
            className="grid gap-4 mt-10 md:grid-cols-2 md:gap-4 lg:grid-cols-3"
        >
            {devicesItems.map(item => (
                <motion.div 
                    variants={childVariants}
                    key={item.id}
                >
                    <Card className="bg-gradient-to-tr from-background via-background to-primary/20">
                        <CardHeader className="flex items-center gap-4">
                                <Image src={item.icon} alt={item.title} width={35} height={35} className="object-cover object-center border aspect-square p-1.5 box-content rounded-lg"/>
                                <h1 className="text-xl">{item.title}</h1>
                        </CardHeader>
                        <CardContent>{item.text}</CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.section>
    </div>
  )
}

export default DevicesItems