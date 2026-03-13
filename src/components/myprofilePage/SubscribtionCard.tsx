import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import useUser from "@/store/useUser"
import { UserFE } from '@/types/type-user-fe'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useSession } from 'next-auth/react'

const SubscribtionCard = () => {

    const { user } = useUser()

  return user?.isSubscribe
  ? <SubscribtionOn user={user}/>
  : <SubscriptionOff />
}

export default SubscribtionCard

const SubscribtionOn = ({ user } : { user: UserFE | null }) => {

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
        <CardFooter className='justify-end z-10 gap-2'>
            <DialogStopSubscription />
            <Button className='bg-accent! cursor-auto' variant={"outline"}>{user?.subscribePlanTitle}</Button>
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

const WORD_TO_TYPE = "stop my plan"

const DialogStopSubscription = () => {

    const [open, setOpen] = useState(false)
    const [loadingStopSubscription, seLoadingStopSubscription] = useState(false)
    const [userInputToStop, setUserInputToStop] = useState("")

    const { update } = useSession()

    const handleStop = async (e:FormEvent) => {
        e.preventDefault()
        if(userInputToStop.trim() != WORD_TO_TYPE) return setOpen(true)
        seLoadingStopSubscription(true)
        try {
            const res = await fetch("/api/pricing", {
                method: "DELETE"
            })
            if(!res.ok) throw new Error("Failed processing your request")
            toast.success("Successfully stop your plan")
            update()
        } catch (error) {
            console.log("Error : ", error)
            toast.error("Something went wrong")
        } finally {
            seLoadingStopSubscription(false)
            setOpen(false)
            setUserInputToStop("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Stop subscription</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Are you sure to stop your plan?</DialogTitle>
                    <DialogDescription>
                        This action can&apos;t be undone
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleStop} className='space-y-8 mt-2'>
                    <section className='space-y-4'>
                        <Label className='lg:text-base' htmlFor='input'>To confirm, type {`"${WORD_TO_TYPE}"`}</Label>
                        <Input id='input' placeholder={WORD_TO_TYPE} value={userInputToStop} onChange={(e) => setUserInputToStop(e.target.value)}/>
                    </section>
                    <section className="flex items-center justify-end gap-2">
                        <Button onClick={() => setOpen(false)} variant={"outline"}>Close</Button>
                        <Button disabled={loadingStopSubscription || userInputToStop.trim() != WORD_TO_TYPE}>{loadingStopSubscription ? <Spinner /> : "Yes"}</Button>
                    </section>
                </form>
            </DialogContent>
        </Dialog>
    )
}