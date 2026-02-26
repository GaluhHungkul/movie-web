"use client"

import Heading from '../common/Heading'
import MutedText from '../common/MutedText'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from '../ui/spinner'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import useUser from '@/store/useUser'

type PricingPlans = {
    id: string,
    title: string
    period: string
    description: string
    price: number
    timePeriod: string
}

const PricingPlans = () => {

    const { update } = useSession()

    const { data, isPending } = useQuery({
        queryKey: ["pricings"],
        queryFn: async () => {
            const res = await fetch("/api/pricing")
            if(!res.ok) throw Error("Failed get pricing plans")
            const { pricings } = await res.json() 
            return pricings as PricingPlans[]
        }
    })

    if(isPending) return null

  return (
    <div className='container'>
        <Heading>Choose the plan that&apos;s right for you</Heading>
        <MutedText>Join Chill and select from our flexible subscription options tailored to suit your viewing preferences Get ready for non-stop entertainment!</MutedText>
        <section className='grid md:grid-cols-2 gap-4 mt-10 lg:gap-10 lg:grid-cols-3'>
            {data?.map((item, index) => (
                <Card key={item.id}>
                    <CardHeader>
                        <h1>{item.title}</h1>
                        <p className='text-muted-foreground'>{item.description}</p>
                    </CardHeader>
                    <CardContent>
                        <h1 className='text-2xl'>${item.price} / {item.timePeriod}</h1>
                    </CardContent>
                    <CardFooter className='gap-2 justify-end'>
                        {index === 0 && <Button variant={"outline"}>Start From Trial</Button>}
                        <DialogBuySubscription subscribePlanId={item.id} titlePlan={item.title} update={update}/>
                    </CardFooter>
                </Card>
            ))}
        </section>
    </div>
  )
}

export default PricingPlans

const DialogBuySubscription = ({ 
    subscribePlanId, 
    titlePlan, 
    update 
} : { 
    subscribePlanId: string; 
    titlePlan: string;
    update: () => void
}) => {

    const [open, setOpen] = useState(false)
    const [loadingBuy, setLoadingBuy] = useState(false)

    const router = useRouter()
    const { user } = useUser()
        
    const handleBuy = async () => {
        setLoadingBuy(true)
        try {
            const res = await fetch("/api/pricing", {
                method: "POST",
                body: JSON.stringify({ subscribePlanId })
            })
            if(!res.ok) throw new Error("Failed processing your request")
            const { message } = await res.json()
            toast.success(message + " Redirecting...")
            update()
            setTimeout(() => {
                router.push("/myprofile")
            }, 2000);
        } catch (error) {
            console.log("Error : ", error)
            toast.error("Something went wrong")
        } finally {
            setLoadingBuy(false)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={(e:FormEvent) => {
                if(user?.isSubscribe){
                    toast.error("You're already in subscription plan")
                    e.preventDefault()
                } 
            }}>
                <Button>Choose Plan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" showCloseButton={false}>
                <DialogHeader>
                <DialogTitle>Are you sure to choose this plan?</DialogTitle>
                <DialogDescription>
                    You&apos;re just choosing <span className='font-bold text-foreground'>{titlePlan}</span>
                </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-end gap-2">
                    <Button onClick={() => setOpen(false)} variant={"outline"}>Close</Button>
                    <Button onClick={handleBuy} disabled={loadingBuy}>{loadingBuy ? <Spinner /> : "Yes"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}