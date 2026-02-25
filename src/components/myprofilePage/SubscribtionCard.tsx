import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import useUser from "@/store/useUser"
import { User } from '@prisma/client'

const SubscribtionCard = () => {

    const { user } = useUser()

  return user?.isSubscribe
  ? <SubscribtionOn user={user}/>
  : <SubscriptionOff />
}

export default SubscribtionCard

const SubscribtionOn = ({ user } : { user: User | null }) => {
  return (
    <Card>
        <CardHeader className='relative z-10'>
            <div className='flex justify-between items-center'>
                <h1 className="font-semibold">Subscription</h1>
                <p className='font-bold border bg-primary px-4 py-1 rounded'>Active</p>
            </div>
        </CardHeader>
        <CardContent className='relative z-10'>
            <p className='font-medium'>Your subscription is active. You&apos;re part of the experience.</p>
        </CardContent>
        <CardFooter className='justify-end z-10'>
            <Button variant={"outline"}>{user?.subscribePlan ?? "Standard Plan"}</Button>
        </CardFooter>
   </Card>
  )
}


const SubscriptionOff = () => {
  return (
   <Card>
        <CardHeader>
            <div className='flex justify-between items-center'>
                <h1 className="font-semibold">Subscription</h1>
                <p className='font-bold border bg-input/30 px-4 py-1 rounded'>Inactive</p>
            </div>
        </CardHeader>
        <CardContent>
            <p className='font-medium'>You don&apos;t have an active subscription. Join to continue the experience.</p>
        </CardContent>
        <CardFooter className='justify-end'>
            <Link href={"/subscription"}>
                <Button>Subscribe Now!</Button>
            </Link>
        </CardFooter>
   </Card>
  )
}