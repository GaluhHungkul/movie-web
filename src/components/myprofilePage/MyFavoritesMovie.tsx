import { useMyFavoritesMovie } from "@/hooks/useMyFavoritesMovie"
import Link from "next/link"
import SkeletonGridMovieList from "../skeletons/SkeletonGridMovieList"
import { Button } from "../ui/button"
import { ArrowRight, Trash } from "lucide-react"
import FavoriteMovieList from "./FavoriteMovieList"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'

const MyFavoritesMovie = ({ showMore=true } : { showMore? : boolean }) => {

  const { data, isPending, isError, error } = useMyFavoritesMovie()
  
  return (
    <div className="relative flex flex-col">
        {!!data?.data.movies.length && <h1 className="text-center">Favorites Movie And TV Series</h1>}
        {!showMore && <RemoveAllFavoritesMovie />}
        {
          isPending 
          ? <SkeletonGridMovieList filter={false}/>
          : (
            isError 
            ? <p>{error.message}</p>
            : <main className="mt-10">
                {data?.data.movies.length ?
                  <div className="flex flex-col">
                    <FavoriteMovieList data={data.data.movies}/>
                    {showMore && <Link href={"/myprofile/favoritesmovie"} className="w-max ml-auto mt-4">
                      <Button variant={"outline"} title="Show More">
                        <ArrowRight />
                      </Button>
                    </Link>}
                  </div>
                  :
                  <div>
                    <h1 className="text-center">
                      You dont&apos;t have any favorites movie
                    </h1>
                  </div>  
                }
              </main>
          )
        }
    </div>
  )
}

export default MyFavoritesMovie

const RemoveAllFavoritesMovie = () => {

  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const allFavoritesMovieMutation = useMutation({
    mutationKey: ["myFavoritesMovie"],
    mutationFn: async () => {
      const res = await fetch("/api/user/favoritesMovie", {
        method: "DELETE",
        body: JSON.stringify({
          deleteAll: true
        })
      })
      if(!res.ok) throw new Error("Failed")
      const { message } = await res.json()
      toast.success(message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myFavoritesMovie"] })
    },
    onError: () => toast.error("Something went wrong"),
  })

  const handleRemoveAllFavoritesMovie = async (e:FormEvent) => {
    e.preventDefault()
    const lt = toast.loading("Loading")
    await allFavoritesMovieMutation.mutateAsync()
    setOpen(false)
    toast.dismiss(lt)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-auto mt-4">
        <Button onClick={() => setOpen(true)} variant="default"><Trash /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="text-start">
          <DialogTitle>Are you sure to delete all favorites movie?</DialogTitle>
          <DialogDescription>
            Once removed, data can&apos;t be restored
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setOpen(false)} variant={"outline"}>Close</Button>
          <Button disabled={allFavoritesMovieMutation.isPending} onClick={handleRemoveAllFavoritesMovie}>
            {allFavoritesMovieMutation.isPending ? <Spinner /> : "Yes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}