import { ChevronRight } from "lucide-react"
import Link from "next/link";
import { FC, useState } from "react"

type Props = {
    data : {
        name : string;
        id : number
    }[]
    
}

const ListGenre : FC<Props> = ({ data }) => {

    const [showGenre, setShowGenre] = useState<boolean>(false)

  return (
    <section className="flex mb-2  text-white flex-col lg:items-start lg:gap-2 text-[16px]">
        <div className="md:text-2xl flex justify-between w-full cursor-pointer lg:cursor-default" onClick={() => setShowGenre(!showGenre)}>
            <p>Genre</p>
            <button className={`font-bold lg:hidden hover:text-gray-500 ${showGenre && "rotate-90"} duration-300`} onClick={() => setShowGenre(!showGenre)}>
                <ChevronRight className='md:scale-125'/>
            </button>
        </div>
        <ul className={`mt-2 grid-cols-2 pl-4 md:text-xl lg:text-base pt-2 lg:grid mb-2 gap-y-4 lg:gap-y-6 gap-x-6 lg:pl-0 text-gray-400 md:grid-cols-4 ${showGenre ? "grid" : "hidden"}`} >
            {data.map((genre) => (
                <li key={genre.id} className="hover:text-gray-500 hover:underline"><Link href={``}>{genre.name}</Link></li>
            ))}
        </ul>
    </section>
  )
}

export default ListGenre