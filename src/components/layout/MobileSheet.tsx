"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Clapperboard, Home, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const NAVIGATION = [
    {
      name : "Dashboard",
      href : "/",
      icon : Home 
    },
    {
      name : "Movies",
      href : "/movies",
      icon : Clapperboard
    },
]

const MobileSheet = () => {

  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  },[pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="hover:scale-110 cursor-pointer duration-300 bg-white/10 rounded-full p-1">
        <Menu size={30}/>
      </SheetTrigger>
      <SheetContent side="left" className="bg-black px-2">
        <SheetClose className="w-max cursor-pointer absolute right-4 top-4 "  color="white">
          <X color="white" className="relative z-10"/>
        </SheetClose>
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"}>
              <Image src={"/assets/img/icon_full.png"} alt="" width={100} height={400} className=""/>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex text-white  flex-col">
          {NAVIGATION.map(nav => (
            <Link key={nav.name} className={`rounded font-semibold text-lg items-center flex py-2 px-4 gap-4 ${pathname === nav.href ? "bg-slate-100/20" : "hover:bg-slate-100/10"}`} href={nav.href}>
              <nav.icon />
              <span>{nav.name}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet