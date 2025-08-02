import { ChevronRight } from "lucide-react"
import { useState } from "react"

const helps : string[] = ["FAQ", "Kontak Kami", "Privasi", "Syarat & Ketentuan"]

const Help = () => {

    const [showHelps, setShowHelps] = useState<boolean>(false)

  return (
    <section className="flex my-5 text-white flex-col lg:items-start lg:gap-2 text-[16px] lg:my-0">
        <div className="md:text-2xl flex justify-between w-full cursor-pointer lg:cursor-default" onClick={() => setShowHelps(!showHelps)}>
            <p>Help</p>
            <button className={`font-bold lg:hidden hover:text-gray-500 ${showHelps && "rotate-90"} duration-300`} onClick={() => setShowHelps(!showHelps)}>
                <ChevronRight className='md:scale-125'/>
            </button>
        </div>
        <ul className={`mt-2 pl-4 md:text-xl lg:text-base pt-2 lg:grid mb-2 gap-y-2 gap-x-6 lg:pl-0 text-gray-400 space-y-2 ${showHelps ? "grid" : "hidden"}`} >
            {helps.map((help, index) => (
                <li key={index} className="hover:text-gray-500">{help}</li>
            ))}
        </ul>
    </section>
  )
}

export default Help