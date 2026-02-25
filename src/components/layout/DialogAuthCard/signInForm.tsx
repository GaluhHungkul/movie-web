"use client"

// import AuthInputForm from '../tags/AuthInputForm'
// import ButtonAuthSubmit from '../tags/ButtonAuthSubmit'
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
import Image from "next/image"
import { signIn } from "next-auth/react"

const signInSchema = z.object({
  password : z.string().min(8),
  email : z.string()
})

type SignInSchema = z.infer<typeof signInSchema>

const SignInForm = () => {

    const { setCurrentAuth } = useAuthCard()

  const { register, handleSubmit, reset } = useForm({
    resolver : zodResolver(signInSchema)
  })

  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false)

  const myHandleSignIn = async ({password, email}: SignInSchema) => {
    const loadingToast = toast.loading("Memproses data login...")
    try {
      setLoadingSignIn(true);    
      const res = await signIn("credentials", {
        redirect : false,
        email, password
      })      
      
      if(!res?.ok) throw new Error(`${res?.error}`)      

      reset()
      toast.success("Selamat Datang!")
      setCurrentAuth(null)
    } catch (error) {
      let errorMessage = "Login gagal"
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
      toast.error(`Login gagal : ${errorMessage}`)
    } finally {
      toast.dismiss(loadingToast)       
      setLoadingSignIn(false);
    }
  }   

  return (
    <div className="space-y-4">
        <form className="space-y-6 w-full" onSubmit={handleSubmit(myHandleSignIn)}>
            <FieldGroup>
                <Field>
                <Label htmlFor="email">Email</Label>
                <Input required {...register("email")} id="email" name="email" type="email"/>
                </Field>
                <Field>
                <Label htmlFor="password">Password</Label>
                <Input required {...register("password")} id="password" name="password" type="password"/>
                </Field>
            </FieldGroup>
            <Button className="w-full font-bold" disabled={loadingSignIn}>{loadingSignIn ? <Spinner /> : "Sign In"}</Button>
        </form>
        <GoogleLoginButton loadingSignIn={loadingSignIn} setLoadingSignIn={setLoadingSignIn}/>
        <p className="text-center">Don{"'"}t have an account yet? <span onClick={() => setCurrentAuth("signUp")} className="text-primary cursor-pointer hover:underline">Sign Up</span></p>
    </div>
  )
}

export default SignInForm

const GoogleLoginButton = ({ loadingSignIn, setLoadingSignIn } : { loadingSignIn: boolean; setLoadingSignIn: (val:boolean) => void }) => {


    return (
        <Button onClick={() => {
          setLoadingSignIn(true)
          signIn("google")
        }} variant={"secondary"} className="w-full font-bold" disabled={loadingSignIn}>{
          loadingSignIn 
          ? <Spinner /> 
          : <>
                <Image alt="" width={400} height={300} src="/assets/img/google.png" className="size-4 mr-1"/>
                <span>Sign In with Google</span>
            </>
        }</Button>
    )
}
