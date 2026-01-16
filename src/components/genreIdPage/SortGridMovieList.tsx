"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


const SortGridMovieList = ({ isMovie } : { isMovie: boolean }) => {
    const sortData = [
      {
        name: "Popularity",
        value: "popularity.desc",
      },
      {
        name: "Rating",
        value: "vote_average.desc",
      },
      {
        name: "Newest",
        value: isMovie ? "primary_release_date.desc" : "first_air_date.desc",
      },
    ]

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const params = new URLSearchParams(searchParams.toString())

  const [sortBy, setSortBy] = useState<string>(
    params.get("sort_by") ?? ""
  )

  const handleSortChange = (value: string) => {
    setSortBy(value)

    params.set("sort_by", value)

    // reset optional filters
    params.delete("vote_count.gte")
    params.delete("primary_release_date.lte")

    if (value === "vote_average.desc") {
        params.set("vote_count.gte", "300")
    }

    if (value === "primary_release_date.desc") {
        const today = new Date().toISOString().split("T")[0]
        if(isMovie) params.set("primary_release_date.lte", today)
        else params.set("first_air_date.lte", today)
    }

    router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
    })
    }


  return (
    <Select value={sortBy} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px] border-muted-foreground! cursor-pointer">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>

          {sortData.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortGridMovieList
