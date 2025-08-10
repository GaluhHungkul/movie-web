import AuthCard from "@/components/auth/AuthCard"
import HeaderAuthCard from "@/components/auth/HeaderAuthCard"
import RegisterAuthCard from "@/components/auth/RegisterAuthCard"

const RegisterPage = () => {
  return (
    <div>
        <AuthCard className="border-2 border-white/50 w-4/5 mx-auto mt-6 rounded px-6  md:mt-28 md:px-10 md:w-3/5 lg:w-[30vw] lg:mt-5 pt-0 pb-10">
            <HeaderAuthCard registerPage/>
            <RegisterAuthCard />            
        </AuthCard>
    </div>
  )
}

export default RegisterPage