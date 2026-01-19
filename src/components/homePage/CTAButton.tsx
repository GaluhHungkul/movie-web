import { Button } from '../ui/button'

const CTAButton = () => {
  return (
    <div className='flex gap-6 mt-12 md:gap-12'>
        {/* <Link href={`/movies`}>
          <Button className='cursor-pointer md:scale-125 md:font-bold' variant={'default'}>Explore More</Button>
        </Link> */}
        <Button className='cursor-pointer md:scale-125 md:font-bold' variant={'destructive'}>Start Watching Now</Button>
    </div>
  )
}

export default CTAButton