import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC } from "react";

type Props = {
    name : string;
    icon : LucideIcon;
    href : string
}

const Navigation : FC<Props>= (props) => {

    const pathname = usePathname()

  return (
    <Link  className={`rounded font-semibold text-lg items-center flex py-2 px-4 gap-4 ${pathname === props.href ? "bg-slate-100/20" : "hover:bg-slate-100/10"}`} href="/">
        <props.icon />
        <span>{props.name}</span>
    </Link>
  )
}

export default Navigation