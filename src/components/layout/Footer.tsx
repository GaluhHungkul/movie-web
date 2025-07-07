"use client"

import { usePathname } from "next/navigation"

const Footer = () => {

    const pathname = usePathname()
    const disabledFooter = ["/login", "/register"]

    if(disabledFooter.includes(pathname)) return null

  return (
    <footer className="bg-[#0D0C0F] text-center content-center h-20 border font-bold text-2xl text-white">
        Ini adalah footer
    </footer>
  )
}

export default Footer