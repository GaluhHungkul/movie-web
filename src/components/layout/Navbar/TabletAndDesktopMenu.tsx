import { Button } from "@/components/ui/button"
import { navItems } from "@/lib/data/categories"
import { Search, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const TabletAndDesktopMenu = () => {
    
    const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-6 justify-between items-center lg:flex-3">
        <ul className="flex gap-2 bg-black px-2 py-4 border w-max rounded-md">
            {navItems.map(item => (
                <li key={item.id}>
                    <Link className={`${pathname === item.href ? "bg-black-12" : ""}  text-foreground hover:bg-black-12 px-5 py-3 rounded`} href={item.href}>{item.label}</Link>
                </li>
            ))}
        </ul>
        <div className="text-muted-foreground flex gap-4 lg:gap-8">
            <Button variant={"ghost"}>
                <Search />
            </Button>
            <Button variant={"ghost"}>
                <User />
            </Button>
        </div>
    </div>
  )
}

export default TabletAndDesktopMenu