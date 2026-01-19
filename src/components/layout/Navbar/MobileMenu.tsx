import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/data/categories"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"


const MobileMenu = () => {

  const pathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setShowMenu(false)
  },[pathname])

  return (
    <div className="relative md:hidden z-[100]">
      <Button 
        variant={"secondary"}
        onClick={() => setShowMenu(p => !p)}
      >
        {showMenu ? <X /> : <Menu />}
      </Button>
      <AnimatePresence>
        {showMenu && 
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute border right-0 top-12 bg-background  rounded p-2 w-max"
          >
            <ul className="gap-1 flex flex-col pb-4">
              {navItems.map(item => (
                <li key={item.id}>
                  <Link className={`${pathname === item.href ? "bg-black-12" : ""} text-foreground block hover:bg-black-12 py-2 px-4 `} href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="border-t py-4 px-4 flex gap-4 text-muted-foreground">
              <Button variant={"ghost"}>
                <Search />
              </Button>
              <Button variant={"ghost"}>
                <Bell />
              </Button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
  
}

export default MobileMenu