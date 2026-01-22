import { TmdbSearchResult } from "@/types/types-search"
import SearchedCard from "./SearchedCard"
import { ReactNode } from "react";

const ListSearchedCard = ({ data, bottomChild } : { data: TmdbSearchResult[]; bottomChild: ReactNode }) => {

  return (
    <div className="max-h-80 my-4 overflow-y-auto space-y-4">
      {data.map((item, index) => <SearchedCard key={`${item.id}-${index}`} data={item}/>)}
      {bottomChild}
    </div>
  )
}

export default ListSearchedCard