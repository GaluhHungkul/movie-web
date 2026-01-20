import Heading from '../common/Heading'
import MutedText from '../common/MutedText'
import { pricingCardItems } from '@/lib/data/categories'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'

const PricingPlans = () => {
  return (
    <div className='container'>
        <Heading>Choose the plan that&apos;s right for you</Heading>
        <MutedText>Join Chill and select from our flexible subscription options tailored to suit your viewing preferences Get ready for non-stop entertainment!</MutedText>
        <section className='grid md:grid-cols-2 gap-4 mt-10 lg:gap-10 lg:grid-cols-3'>
            {pricingCardItems.map(item => (
                <Card key={item.id}>
                    <CardHeader>
                        <h1>{item.title}</h1>
                        <p className='text-muted-foreground'>{item.text}</p>
                    </CardHeader>
                    <CardContent>
                        <h1 className='text-2xl'>${item.price}/{item.period}</h1>
                    </CardContent>
                    <CardFooter className='gap-2'>
                        <Button variant={"outline"}>Start From Trial</Button>
                        <Button>Choose Plan</Button>
                    </CardFooter>
                </Card>
            ))}
        </section>
    </div>
  )
}

export default PricingPlans