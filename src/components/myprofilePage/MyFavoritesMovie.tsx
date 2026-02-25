import { useMyFavoritesMovie } from "@/hooks/useMyFavoritesMovie"
import Image from "next/image"
import Link from "next/link"
import SkeletonGridMovieList from "../skeletons/SkeletonGridMovieList"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

const MyFavoritesMovie = ({ showMore=true } : { showMore? : boolean }) => {

  const { data, isPending, isError, error } = useMyFavoritesMovie()
  
  return (
    <div className="mt-20 relative ">
        <h1 className="text-center">Favorites Movie And TV Series</h1>
        {
          isPending 
          ? <SkeletonGridMovieList filter={false}/>
          : (
            isError 
            ? <p>{error.message}</p>
            : <main className="mt-10">
                {data?.data.movies.length ?
                  <div className="flex flex-col">
                    <section className="grid grid-cols-2 gap-4 md:grid-cols-4 ">
                      {data?.data.movies.map((favorite) => (
                        <Link href={`/${favorite.isMovie ? "movies" : "tv"}/detail/${favorite.movieId}`} key={favorite.id} className="relative aspect-[2/3] rounded overflow-hidden">
                          <Image src={favorite.poster_path} alt={favorite.title} className="object-cover object-center hover:scale-110 duration-300" fill sizes="25vw"/>
                        </Link>
                      ))}
                    </section> 
                    {data.data.movies.length >= 8 && showMore && <Link href={"/myprofile/favoritesmovie"} className="w-max ml-auto mt-4">
                      <Button variant={"outline"} title="Show More">
                        <ArrowRight />
                      </Button>
                    </Link>}
                  </div>
                  :
                  <div>
                    <h1 className="text-center">
                      Your favorites movie is empty
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