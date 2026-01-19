import { ReactNode } from 'react'

const Heading = ({ children, className } : { children: ReactNode; className?: string }) => {
  return (
    <h1 className={`${className} text-2xl mb-2 text-foreground`}>
      {children}
    </h1>
  )
}

export default Heading