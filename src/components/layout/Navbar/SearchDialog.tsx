import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useSearchMulti } from "@/lib/api/getMovies"
import { useDebounce } from "@/lib/hooks/useDebounce"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import ListSearchedCard from "./ListSearchedCard"
import { useInView } from "react-intersection-observer"

const SearchDialog = ({ open, onOpenChange } : { open: boolean; onOpenChange: (open:boolean) => void}) => {

    const [inputQuery, setInputQuery] = useState("")

    const debouncedSearch = useDebounce(inputQuery)    

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "20px"
    })

    const { data, isPending, isLoading,  isError, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useSearchMulti(debouncedSearch)
    const mainContent = isPending 
    ? <p className="text-center my-4">Find movies by title, genre, or release year.</p>
    : (
        isLoading 
        ? <Spinner className="my-4 size-8 mx-auto"/>
        : (
            isError 
            ? <p>Error : {error.message}</p>
            : <ListSearchedCard data={data.pages.flatMap(page => page.results ?? []) ?? []} bottomChild={
            <>
                {hasNextPage && <div ref={ref} className="h-10"/>}
                {isFetchingNextPage && <Spinner className="mt-10 size-8 mx-auto"/>}
            </>
        }/>
        )
    )

    useEffect(() => {
        if(inView && hasNextPage && !isFetchingNextPage) fetchNextPage()
        
    },[inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogTrigger asChild>
          <Button variant={"ghost"}><Search /></Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader className="flex flex-col items-center">
                <DialogTitle>Search a Show</DialogTitle>
                <DialogDescription>Enter the title or name</DialogDescription>
            </DialogHeader>
            <Input onChange={(e) => setInputQuery(e.target.value)} className="md:text-lg" placeholder="Search" />
            {mainContent}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default SearchDialog