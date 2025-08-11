"use client"

import Link from "next/link"
import MobileSheet from "../MobileSheet"
import Image from "next/image"
import SearchBar from "./SearchBar"
import { usePathname } from "next/navigation"
import { disabledLayout } from "@/lib/data/disabledLayout"
import ProfileButtonArea from "./ProfileButtonArea"

const Header  = () => {

  const pathname = usePathname()

  if(disabledLayout.includes(pathname)) return null


  return (
    <div className="text-white/80 text-sm flex  px-2 lg:px-8 h-16 content-center gap-8 lg:gap-12 font-bold  items-center sticky top-0 z-10 bg-foreground w-screen">
      <MobileSheet />
      <Link href={"/"} className="hidden md:inline">
        <Image src={"/assets/img/icon_full.png"} alt="" width={100} height={400} className=""/>
      </Link>
      <SearchBar /> 
      <ProfileButtonArea />
    </div>
  )
}

export default Header