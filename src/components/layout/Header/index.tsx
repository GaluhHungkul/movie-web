import Link from "next/link"
import MobileSheet from "../MobileSheet"
import Image from "next/image"
import SearchBar from "./SearchBar"

const Header = () => {
  return (
    <div className="text-white/80 text-sm h-16 content-center gap-8 lg:gap-12 font-bold flex items-center">
      <MobileSheet />
      <Link href={"/"} className="hidden md:inline">
        <Image src={"/assets/img/icon_full.png"} alt="" width={100} height={400} className=""/>
      </Link>
      <SearchBar />
    </div>
  )
}

export default Header