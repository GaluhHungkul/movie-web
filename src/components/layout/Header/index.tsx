import Link from "next/link"
import MobileSheet from "../MobileSheet"
import Image from "next/image"
import SearchBar from "./SearchBar"
import { Suspense } from "react"

const Header  = async () => {


  return (
    <div className="text-white/80 text-sm  px-2 lg:px-8 h-16 content-center gap-8 lg:gap-12 font-bold flex items-center sticky top-0 z-10 bg-foreground w-screen">
      <MobileSheet />
      <Link href={"/"} className="hidden md:inline">
        <Image src={"/assets/img/icon_full.png"} alt="" width={100} height={400} className=""/>
      </Link>
      <Suspense fallback={null}>
        <SearchBar /> 
      </Suspense>
    </div>
  )
}

export default Header