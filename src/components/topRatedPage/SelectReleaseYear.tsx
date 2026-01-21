import { useState } from 'react'
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

    const [year, setYear] = useState<string>(params.get("year") ?? "all")

    const handleYearChange = (value: string) => {
        setYear(value)
        if(value === "all") {
            params.delete("year")
        } else {
            params.set("year", value)
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

  return (
    <Select onValueChange={handleYearChange} value={year}>
        <SelectTrigger className="w-40 mt-4 ml-auto border-muted-foreground! cursor-pointer">
            <SelectValue placeholder={year ?? "Select release year"} />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>{year ?? "Release Year"}</SelectLabel>
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