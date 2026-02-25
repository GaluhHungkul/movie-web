"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import useAuthCard from "@/store/useAuthCard"
import { signIn } from "next-auth/react"


const signUpSchema = z.object({
  name : z.string().trim().min(1),
  password : z.string().trim().min(8),
  email : z.string().email("Email tidak valid"),
  password_confirmation : z.string().min(8),
})
.refine((data) => data.password === data.password_confirmation, {
  message : "Password tidak cocok",
  path : ["password_confirmation"]
})

type SignUpSchema = z.infer<typeof signUpSchema>

const SignUpForm = () => {

  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false)
  const { setCurrentAuth } = useAuthCard()


  const { register, handleSubmit, reset } = useForm({
    resolver : zodResolver(signUpSchema)
  })

  const myHandleSignUp = async ({ password, email, name }:SignUpSchema) => {
    setLoadingSignUp(true);
    const signUpLoadingToast = toast.loading("Memproses data...")
    try {
      const resSignUp = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email }),
      });
      if (resSignUp.ok) {
        toast.success("Pendaftaran berhasil")
        toast.dismiss(signUpLoadingToast)
        const signInLoadingToast = toast.loading("Sign In...")
        const resSignIn = await signIn("credentials", {
            email, password,
            redirect : false
        })
        if(!resSignIn?.ok) throw new Error(`${resSignIn?.error}`)
        toast.dismiss(signInLoadingToast)
        toast.success("Login Berhasil")
        setCurrentAuth(null)
        reset()
      } else {
        const { message } = await resSignUp.json();
        toast.error(message)
      }
      
    } catch (error) {
      toast.error("Terjadi kesalahan")
      console.log("error : " + error);
    } finally {
      setLoadingSignUp(false);
      toast.dismiss(signUpLoadingToast)
    }
  }   

  return (
    <div className="space-y-4">
        <form className="space-y-6 w-full md:w-4/5 md:mx-auto lg:space-y-1" onSubmit={handleSubmit(myHandleSignUp)}>
            <FieldGroup>
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input required {...register("name")} id="name" name="name" type="text"/>
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input required {...register("email")} id="email" name="email" type="email"/>
              </Field>
              <Field>
                <Label htmlFor="password">Password</Label>
                <Input required {...register("password")} id="password" name="password" type="password"/>
              </Field>
              <Field>
                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                <Input required {...register("password_confirmation")} id="password_confirmation" name="password_confirmation" type="password"/>
              </Field>
            </FieldGroup>
            <Button className="w-full font-bold lg:mt-4" disabled={loadingSignUp}>{loadingSignUp ? <Spinner /> : "Sign Up"}</Button>
        </form>
        <p className="text-center">Already have an account? <span onClick={() => setCurrentAuth("signIn")} className="text-primary cursor-pointer hover:underline">Sign In</span></p>
    </div>
  )
}

export default SignUpForm
