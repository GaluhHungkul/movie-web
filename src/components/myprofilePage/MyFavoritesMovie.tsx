import { FavoriteMovie } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

const MyFavoritesMovie = ({ data, showMore=true } : { data : FavoriteMovie[] | undefined, showMore? : boolean }) => {

  return (
    <div className="mt-20 relative">
        <h1 className="text-center md:text-lg lg:text-2xl">Favorites Movie</h1>
        {showMore && <Link href={"/myprofile/favoritesmovie"} className="absolute right-0 text-sm hover:underline text-white/70 md:text-base">Show more</Link>}
        <main className="mt-10">
          {data?.length ?
            <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {data?.map((favorite) => (
                <Link href={`/movies/detail/${favorite.movieId}`} key={favorite.id} className="relative aspect-[2/3] rounded overflow-hidden">
                  <Image src={favorite.poster_path} alt={favorite.title} className="object-cover object-center hover:scale-110 duration-300" fill sizes="25vw"/>
                </Link>
            ))}
            </section> :
            <div>
              <h1 className="text-center">
                Your favorites movie is empty
              </h1>
            </div>  
          }
        </main>
    </div>
  )
}

export default MyFavoritesMovie