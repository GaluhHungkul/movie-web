"use client"

import Link from 'next/link'
import { Button } from '../ui/button'

const CTAButton = () => {
  return (
    <div className='flex gap-6 mt-12 md:gap-12'>
        <Link href={`/movies`}>
          <Button className='cursor-pointer md:scale-125 md:font-bold' variant={'default'}>Explore More</Button>
        </Link>
        <Button className='cursor-pointer md:scale-125 md:font-bold text-black' variant={'secondary'}>See Pricing</Button>
    </div>
  )
}

export default CTAButton