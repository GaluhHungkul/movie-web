"use client"

import { usePathname } from "next/navigation"
import { disabledLayout } from "@/lib/data/disabledLayout"
import ProfileButtonArea from "./ProfileButtonArea"
import Logo from "@/components/common/Logo"
import { SidebarTrigger } from "@/components/ui/sidebar"
const Header  = () => {

  const pathname = usePathname()

  if(disabledLayout.includes(pathname)) return null


  return (
    <div className="text-white/80 text-sm flex justify-between h-16 content-center gap-8 lg:gap-12 font-bold  items-center  top-0 z-[50] bg-foreground ">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Logo />
      </div>
      {/* <SearchBar />        */}
      <ProfileButtonArea />
    </div>
  )
}

export default Header