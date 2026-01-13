import Link from 'next/link'

const Logo = ({ className } : { className?: string }) => {
  return (
    <Link href={"/"}>
        <h1 className={`font-bold text-3xl text-secondary ${className}`}>Chill.</h1>
    </Link>
  )
}

export default Logo