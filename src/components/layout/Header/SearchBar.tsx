"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState("")

    const router = useRouter()

    const handleSearchMovie = async (e:FormEvent) => {
        e.preventDefault()
        if(searchValue.trim() === "") return
        router.push(`/movies/search/${encodeURIComponent(searchValue)}`)
    }

  return (
    <form onSubmit={handleSearchMovie} className="flex items-center gap-2 w-52">
        <Input onChange={(e) => setSearchValue(e.target.value)} placeholder="Search"/>
        <Button variant="secondary"><Search /></Button>
    </form>
  )
}

export default SearchBar