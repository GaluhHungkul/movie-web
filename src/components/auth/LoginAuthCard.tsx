"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod" 
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import AuthInputCard from './AuthInputCard'
import Link from 'next/link'

const loginSchema = z.object({
    email : z.string(),
    password : z.string()
})

type LoginSchema = z.infer<typeof loginSchema>

const LoginAuthCard = () => {

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
        <p className='text-center text-white/50 relative top-2 text-xs md:text-base'>Didn{"'"}t have an account yet? <Link href={"/register"} className='text-blue-500 hover:underline'>Sign Up</Link></p>
        <Button className='w-full font-bold mt-6 cursor-pointer md:mt-6 md:text-lg lg:py-6 lg:text-xl' variant={"secondary"}>Sign In</Button>
    </form>
  )
}

export default LoginAuthCard