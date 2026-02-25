"use client"

import { usePathname, useRouter } from "next/navigation"
import { disabledLayout } from "@/lib/data/disabledLayout"
import MobileMenu from "./MobileMenu"
import Logo from "@/components/common/Logo"
import TabletAndDesktopMenu from "./TabletAndDesktopMenu"
import useAuthCard from "@/store/useAuthCard"
import useUser from "@/store/useUser"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const Navbar  = () => {

  const pathname = usePathname()

  const { data: session, status } = useSession()

  const router = useRouter()

  const { setCurrentAuth } = useAuthCard()
  const { setUser, user } = useUser()

  const handleClickUserIcon = async () => {
    if(!user) return setCurrentAuth("signIn")
    router.push("/myprofile")
  }
  useEffect(() => {
    if(status !== "loading" && session?.user) setUser(session.user)
  },[status, session, setUser, pathname])
  
  if(disabledLayout.includes(pathname)) return null

  return (
    <nav className="sticky top-0 z-[50] bg-background">
      <div className={`text-primary text-sm flex container justify-between py-4 content-center gap-8 lg:gap-12 font-bold items-center rounded`}>
        <div className="md:flex-1">
          <Logo />
        </div>
        <MobileMenu handleClickUserIcon={handleClickUserIcon}/>
        <TabletAndDesktopMenu handleClickUserIcon={handleClickUserIcon}/>
      </div>
    </nav>
  )
}

export default Navbar