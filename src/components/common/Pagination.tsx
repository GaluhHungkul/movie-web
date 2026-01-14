import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  page : number;
  params : URLSearchParams
}

const Pagination : FC<Props> = ({ page, params }) => {

  const router = useRouter()
  const pathname = usePathname()

  const handlePagination = (val:"prev" | "next") => {
    if(val === "prev") {
      if(page - 1 === 1) params.delete("page")
      else params.set("page", (page - 1).toString())
    } else {
      params.set("page", (page + 1).toString())
    }
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }

  return (
    <div className="my-10 flex items-center justify-center gap-4 absolute bottom-0 right-1/2 translate-x-1/2">
      <button className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 active:bg-white/30 disabled:brightness-50 disabled:bg-white/5 disabled:cursor-default" disabled={page <= 1} onClick={() => handlePagination("prev")}><ChevronLeft /></button>
      <span className="text-2xl md:text-3xl">{page}</span>
      <button className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 active:bg-white/30 disabled:brightness-50 disabled:bg-white/5 disabled:cursor-default" onClick={() => handlePagination("next")}><ChevronRight /></button>
    </div>
  )
}

export default Pagination