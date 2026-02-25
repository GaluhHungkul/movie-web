import Link from 'next/link'

const Logo = ({ className, small=false } : { className?: string; small?: boolean }) => {
  return (
    <Link href={"/"}>
      <h1 className={`font-bold ${small ? "text-2xl" : "text-3xl"}  ${className}`}>Chill.</h1>
    </Link>
  )
}

export default Logo