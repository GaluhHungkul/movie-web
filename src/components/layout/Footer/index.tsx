"use client"

import { movieGenres } from '@/lib/data/genres'
import { usePathname } from 'next/navigation'
import ListGenre from './ListGenre'
import AllRightsReserved from './AllRightsReserved'
import Help from './Help'
import { disabledLayout } from '@/lib/data/disabledLayout'

const Footer = () => {

    const pathname = usePathname()

    if(disabledLayout.includes(pathname)) return null
    
  return (
    <footer className={`border`}>
        <div className='py-5 flex flex-col gap-10 lg:pt-15 pb-16 md:mb-24 lg:flex-row container'>
            <AllRightsReserved />
            <div className="lg:flex lg:ml-28 lg:flex-1 lg:justify-around">
                <ListGenre data={movieGenres}/>
                <Help />
            </div>
        </div>
    </footer>
    )
}

export default Footer