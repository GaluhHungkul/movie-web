import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

type Props = {
  page : number;
  setPage : (value:number) => void
  isNextPage : boolean | undefined
}

const Pagination : FC<Props> = ({ page, setPage, isNextPage }) => {
  return (
    <div className="my-10 flex items-center justify-center gap-4 absolute bottom-0 right-1/2 translate-x-1/2">
      <button className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 active:bg-white/30 disabled:brightness-50 disabled:bg-white/5 disabled:cursor-default" disabled={page <= 1} onClick={() => setPage(page - 1)}><ChevronLeft /></button>
      <span className="text-2xl md:text-3xl">{page}</span>
      <button className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 active:bg-white/30 disabled:brightness-50 disabled:bg-white/5 disabled:cursor-default" disabled={!isNextPage} onClick={() => setPage(page + 1)}><ChevronRight /></button>
    </div>
  )
}

export default Pagination