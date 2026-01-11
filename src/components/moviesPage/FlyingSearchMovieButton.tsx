"use client"

import { Search } from 'lucide-react'
import { Button } from '../ui/button'

const FlyingSearchMovieButton = () => {
  return (
    <Button className='fixed bottom-5 right-5 scale-125 md:right-10 lg:right-32' variant={"secondary"}>
        <Search strokeWidth={4} />
    </Button>
  )
}

export default FlyingSearchMovieButton