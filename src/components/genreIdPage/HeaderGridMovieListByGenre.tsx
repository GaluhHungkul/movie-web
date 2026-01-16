import { ArrowDownUp } from "lucide-react";
import { Button } from "../ui/button";
import SortGridMovieList from "./SortGridMovieList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HeaderGridMovieListByGenre = ({ isMovie } : { isMovie: boolean }) => {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const sortByParams = params.get("sort_by")

  const pathname = usePathname()
  const router = useRouter()

  const handleToggleOrder = () => { 
    if(!sortByParams) return
    const currOrder = sortByParams.split(".")[1]
    if(currOrder === "desc") { 
      params.set("sort_by", `${sortByParams.split(".")[0]}.asc`) 
    }
    else if(currOrder === "asc") {
      params.set("sort_by", `${sortByParams.split(".")[0]}.desc`)
    } 
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center justify-end gap-4">
      <Button variant={"secondary"} onClick={handleToggleOrder} className="cursor-pointer"><ArrowDownUp /></Button>
      <SortGridMovieList isMovie={isMovie}/>
    </div>
  )
}

export default HeaderGridMovieListByGenre