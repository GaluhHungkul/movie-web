import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"}>
        <h1 className="font-bold text-3xl text-secondary">Chill.</h1>
    </Link>
  )
}

export default Logo