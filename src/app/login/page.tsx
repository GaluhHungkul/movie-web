"use client"

import AuthCard from "@/components/auth/AuthCard"
import BodyAuthCard from "@/components/auth/BodyAuthCard"
import GoogleLoginButton from "@/components/auth/GoogleLoginButton"
import HeaderAuthCard from "@/components/auth/HeaderAuthCard"

const LoginPage = () => {


  return (
    <div>
        <AuthCard className="border-2 border-white/50 w-4/5 mx-auto mt-20 min-h-[500px] rounded px-6 md:min-h-[700px] md:mt-28 md:px-10 md:w-3/5 lg:w-[35vw] lg:mt-5 lg:min-h-[700px]">
            <HeaderAuthCard />
            <BodyAuthCard />
            <GoogleLoginButton />
        </AuthCard>
    </div>
  )
}

export default LoginPage