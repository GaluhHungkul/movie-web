"use client"

import { usePathname } from "next/navigation"
import { disabledLayout } from "@/lib/data/disabledLayout"
import MobileMenu from "./MobileMenu"
import Logo from "@/components/common/Logo"
import TabletAndDesktopMenu from "./TabletAndDesktopMenu"
const Navbar  = () => {

  const pathname = usePathname()

  if(disabledLayout.includes(pathname)) return null

  return (
    <nav className="sticky top-0 z-[50] bg-background">
        <div className={`text-primary text-sm flex container justify-between py-4 content-center gap-8 lg:gap-12 font-bold items-center rounded`}>
        <div className="md:flex-1">
          <Logo />
        </div>
        <MobileMenu />
        <TabletAndDesktopMenu />
      </div>
    </nav>
  )
}

export default Navbar