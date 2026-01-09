"use client"

import { Button } from '../ui/button'

const CTAButton = () => {
  return (
    <div className='flex gap-6 mt-12'>
        <Button className='cursor-pointer' variant={'default'}>Explore More</Button>
        <Button className='cursor-pointer text-black' variant={'secondary'}>See Pricing</Button>
    </div>
  )
}

export default CTAButton