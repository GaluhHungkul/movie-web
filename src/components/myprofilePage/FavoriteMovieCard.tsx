import { FavoriteMovie } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
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

const FavoriteMovieCard = ({ isMovie, movieId, id, poster_path,title } : FavoriteMovie) => {

  return (
    <Link href={`/${isMovie ? "movies" : "tv"}/detail/${movieId}`} key={id} className="relative aspect-[2/3] rounded overflow-hidden group">
        <Image src={poster_path} alt={title} className="object-cover object-center hover:scale- duration-300" fill sizes="25vw"/>
        <DialogRemoveFavoriteMovie movieId={movieId}/>
        <div className={`bg-background/70 absolute inset-0  rounded z-10 translate-y-full group-hover:translate-y-0 duration-500 delay-0 flex items-end p-4`}>
            <h1 className='line-clamp-2'>{title}</h1>
        </div>
    </Link>
  )
}

export default FavoriteMovieCard



const DialogRemoveFavoriteMovie = ({ movieId } : { movieId: string }) => {

    const [open, setOpen] = useState(false)

    const queryClient = useQueryClient()

  const favoritesMovieMutation = useMutation({
    mutationKey: ["myFavoritesMovie"],
    mutationFn: async (movieId: string) => {
      const res = await fetch("/api/user/favoritesMovie", {
        method: "DELETE",
        body: JSON.stringify({movieId})
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

  const handleRemoveFavoritesMovie = async (e:FormEvent) => {
    e.preventDefault()
    const lt = toast.loading("Loading")
    await favoritesMovieMutation.mutateAsync(movieId)
    setOpen(false)
    toast.dismiss(lt)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='z-20 hidden group-hover:block'>
        <Button onClick={(e) => {
            e.preventDefault()
            setOpen(true)
        }} variant="secondary" className='absolute top-4 right-4'> <Trash /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
          <DialogDescription>
            Once removed, data can&apos;t be restored
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-2">
            <Button onClick={(e) => {
                e.preventDefault()
                setOpen(false)
            }} variant={"outline"}>Close</Button>
            <Button disabled={favoritesMovieMutation.isPending} onClick={handleRemoveFavoritesMovie}>
                {favoritesMovieMutation.isPending ? <Spinner /> : "Yes"}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}