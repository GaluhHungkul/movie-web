"use client"

import { usePathname } from "next/navigation"
import { disabledLayout } from "@/lib/data/disabledLayout"
import ProfileButtonArea from "./ProfileButtonArea"
import Logo from "@/components/common/Logo"
const Header  = () => {

  const pathname = usePathname()

  if(disabledLayout.includes(pathname)) return null


  return (
    <div className="text-white/80 px-5 md:px-10 lg:px-20 text-sm flex justify-between h-16 content-center gap-8 lg:gap-12 font-bold  items-center sticky top-0 z-[50] bg-foreground ">
      <Logo />
      {/* <SearchBar />        */}
      <ProfileButtonArea />
    </div>
  )
}

export default Header