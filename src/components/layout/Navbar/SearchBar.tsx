"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"

const SearchBar = () => {

    const searchParams = useSearchParams()
    const query = searchParams.get("query") ?? ""

    const [searchValue, setSearchValue] = useState(query)
    const router = useRouter()

    const handleSearchMovie = async (e:FormEvent) => {
        e.preventDefault()
        if(searchValue.trim() === "") return
        router.push(`/movies/search?query=${encodeURIComponent(searchValue)}`)
    }

  return (
    <form onSubmit={handleSearchMovie} className="items-center gap-2 w-52 md:w-1/2 lg:w-1/4 ">
        <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search"/>
        <Button className="cursor-pointer" variant="secondary"><Search /></Button>
    </form>
  )
}

export default SearchBar