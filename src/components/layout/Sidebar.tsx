"use client"

import { Camera, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAVIGATION = [
    {
        name : "Dashboard",
        href : "/",
        icon : Home 
    },
    {
        name : "Movies",
        href : "/movies",
        icon : Camera 
    },
]

const Sidebar = () => {

    const pathname = usePathname()  

  return (
    <div className="hidden shrink-0 w-20 bg-primary border-r md:flex flex-col items-center pt-14 gap-2">
        {NAVIGATION.map(nav => (
            <Link href={nav.href} key={nav.name} className={`text-white w-full py-2 ${nav.href === pathname ? "bg-white/20" : "hover:bg-white/10"} `}>
                <nav.icon size={20} className="mx-auto"/>
            </Link>
        ))}
    </div>
  )
}

export default Sidebar