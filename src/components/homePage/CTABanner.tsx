import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import Heading from '../common/Heading'
import MutedText from '../common/MutedText'

const CTABanner = () => {
  return (
    <div className='container'>
      <Card className='relative md:py-12'>
        <Image src={"/assets/images/cta-bg-img.png"} alt={"Start your free trial today"} fill className='object-cover object-center'/>
        <CardContent className='relative z-10 text-center'>
            <Heading animate={false}>Start your free trial today!</Heading>
            <MutedText animate={false}>Start your free trial today and discover why millions choose Chill for their entertainment.</MutedText>
            <Button>Start a Free Trial!</Button>
        </CardContent>
    </Card>
    </div>
  )
}

export default CTABanner