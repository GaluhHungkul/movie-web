"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod" 
import { Button } from '../ui/button'
import AuthInputCard from './AuthInputCard'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const registerSchema = z.object({
    email : z.string(),
    password : z.string().min(8),
    name : z.string().min(5).max(12).regex(/^[A-Za-z\d]+$/, { message: "Username hanya boleh terdiri dari huruf dan angka",}),
   confirmPassword : z.string().min(8),
})
.refine((data) => data.password === data.confirmPassword, {
  message : "Password tidak cocok",
  path : ["confirmPassword"]
})

type RegisterSchema = z.infer<typeof registerSchema>

const RegisterAuthCard = () => {

    const router = useRouter()

    const { register, reset, formState : { errors, isSubmitting }, handleSubmit } = useForm({
        resolver : zodResolver(registerSchema)
    })

    const myHandleSubmit = async (value:RegisterSchema) => {
        try {
            const res = await fetch("/api/auth/register", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(value)
            })
            if(!res.ok) throw new Error("Failed to sign up data")
            router.push("/login")
        } catch (error) {
            console.log("Error : " , error)
        } finally {
            reset()
        }
    }

  return (
    <form onSubmit={handleSubmit(myHandleSubmit)} className='space-y-4 mt-8 md:space-y-8 lg:mt-0'>
        <AuthInputCard errorMsg={errors.name?.message} placeholder='Name' type='text' {...register("name")}/>
        <AuthInputCard errorMsg={errors.email?.message} placeholder='Email' type='email' {...register("email")}/>
        <AuthInputCard errorMsg={errors.password?.message} placeholder='Password' type='password' {...register("password")}/>
        <AuthInputCard errorMsg={errors.confirmPassword?.message} placeholder='Confirm Password' type='password' {...register("confirmPassword")}/>
        <p className='text-center text-white/50 relative top-2 text-xs md:text-base'>Already have an account? <Link href={"/login"} className='text-blue-500 hover:underline'>Sign In</Link></p>
        <Button disabled={isSubmitting} className='w-full font-bold mt-6 cursor-pointer md:mt-6 md:text-lg lg:py-6 lg:text-xl' variant={"secondary"}>{isSubmitting ? "Loading..." : "Sign Up"}</Button>
    </form>
  )
}

export default RegisterAuthCard