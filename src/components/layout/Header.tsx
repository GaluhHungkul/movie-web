import { ReactNode } from "react"

const Header = ({ children } : { children : ReactNode }) => {
  return (
    <div className="bg-primary border-b text-white/80 text-sm h-14 content-center pl-4 font-bold">
        {children}
    </div>
  )
}

export default Header