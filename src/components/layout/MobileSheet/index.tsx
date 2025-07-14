"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Home, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Navigation from "./Navigation"
import ListFilterMoviesBy from "./ListFilterMoviesBy"

const MobileSheet = () => {

  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  },[pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="cursor-pointer duration-300 hover:bg-white/10 rounded-full p-1 lg:ml-8 lg:scale-110 lg:hover:scale-120">
        <Menu size={32}/>
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
        <div className="text-white space-y-2">
          <Navigation icon={Home} name="Dashboard" href="/"/>
          <ListFilterMoviesBy />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet