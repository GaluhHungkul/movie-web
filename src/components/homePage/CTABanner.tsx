import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import Heading from '../common/Heading'
import MutedText from '../common/MutedText'

const CTABanner = () => {
  return (
    <Card className='relative container md:py-12 '>
        <Image src={"/assets/images/cta-bg-img.png"} alt={"Start your free trial today"} fill className='object-cover object-center'/>
        <CardHeader className='relative z-10 text-center'>
            <Heading animate={false}>Start your free trial today!</Heading>
            <MutedText animate={false}>Start your free trial today and discover why millions choose Chill for their entertainment.</MutedText>
        </CardHeader>
        <CardContent className='relative z-10 text-center'>
            <Button>Start a Free Trial!</Button>
        </CardContent>
    </Card>
  )
}

export default CTABanner