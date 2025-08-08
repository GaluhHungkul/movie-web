import { ReactNode } from "react"

const AuthCard = ({ children, className } : { children : ReactNode, className? : string }) => {
  return (
    <div className={className}>
        {children}
    </div>
  )
}

export default AuthCard