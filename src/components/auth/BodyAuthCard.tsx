import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod" 
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import AuthInputCard from './AuthInputCard'

const loginSchema = z.object({
    email : z.string(),
    password : z.string()
})

type LoginSchema = z.infer<typeof loginSchema>

const BodyAuthCard = () => {

    const { register, reset, formState : { errors }, handleSubmit } = useForm({
        resolver : zodResolver(loginSchema)
    })

    const myHandleSubmit = async (value:LoginSchema) => {
        try {
            await signIn("credentials", {
                callbackUrl : "/",
                ...value
            })
        } catch (error) {
            console.log("Error : " , error)
            reset()
        }
    }

  return (
    <form onSubmit={handleSubmit(myHandleSubmit)} className='space-y-4 mt-8 md:space-y-8'>
        <AuthInputCard errorMsg={errors.email?.message} placeholder='Email' type='email' {...register("email")}/>
        <AuthInputCard errorMsg={errors.password?.message} placeholder='Password' type='password' {...register("password")}/>
        <Button className='w-full font-bold mt-16 cursor-pointer md:mt-28 md:text-lg lg:py-6 lg:text-xl' variant={"secondary"}>Login</Button>
    </form>
  )
}

export default BodyAuthCard