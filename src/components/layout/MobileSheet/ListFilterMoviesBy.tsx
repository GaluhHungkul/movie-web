import { CalendarDays, Drama, ListFilter, Trophy } from "lucide-react"
import FilterBy from "./FilterBy"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"


const FILTERING_MOVIES = [
  {
    by : "Genre",
    href : "/filterby/genre",
    icon : Drama
  },
  {
    by : "Popularity",
    href : "/filterby/popularity",
    icon : Trophy
  },
  {
    by : "Year",
    href : "/filterby/year",
    icon : CalendarDays
  },
]

const ListFilterMoviesBy = () => {

  const [showListFilter, setShowListFilter] = useState(false)
  

  return (
    <div className="group">
      <button onClick={() => setShowListFilter(p => !p)} className={`w-full rounded font-semibold text-lg items-center flex py-2 px-4 gap-4 hover:bg-slate-100/10 cursor-pointer ` }> 
        <ListFilter />
        <p>Filter</p>
      </button>
      <AnimatePresence>
        {showListFilter && 
        <section 
        className="pl-9 space-y-2">
          {FILTERING_MOVIES.map((val, index) => (
            <FilterBy key={index} index={index} by={val.by} href={val.href} icon={val.icon}/>
          ))}
        </section>}
      </AnimatePresence>
    </div>
  )
}

export default ListFilterMoviesBy 