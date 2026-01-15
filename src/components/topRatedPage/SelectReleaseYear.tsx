import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SelectReleaseYear = () => {

    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    const router = useRouter()

    const pathname = usePathname()

    const currentYear = new Date().getFullYear() - 1

    const years = Array.from(
        { length: currentYear - 2010 },
        (_, i) => String(currentYear - i)
    )

    const [year, setYear] = useState<string>("")

    const handleYearChange = (value: string) => {
        if(value === "all") {
            setYear(value)
            params.delete("year")
        } else {
            setYear(value)
            params.set("year", value)
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

  return (
    <Select onValueChange={handleYearChange} value={year}>
        <SelectTrigger className="w-[180px] mt-8 ml-auto border-muted-foreground! cursor-pointer">
            <SelectValue placeholder="Release Year" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>Release Year</SelectLabel>
            <SelectItem value={"all"}>All year</SelectItem>
            {years.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default SelectReleaseYear