import { ReactNode } from 'react'

const MutedText = ({ children, className } : { children: ReactNode; className?: string }) => {
  return (
    <p className={`${className} text-sm mb-8 text-muted-foreground`}>
      {children}
    </p>
  )
}

export default MutedText