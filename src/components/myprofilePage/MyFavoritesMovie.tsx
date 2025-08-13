import { FavoriteMovie } from "@prisma/client"
import Image from "next/image"

const MyFavoritesMovie = ({ data } : { data : FavoriteMovie[] | undefined }) => {

  return (
    <div className="mt-20">
        <h1 className="text-center">Favorites Movie</h1>
        <main className="mt-10">
          {data?.length ?
            <section className="flex">
              {data?.map((favorite) => (
                <div key={favorite.id} className="relative aspect-[2/3] rounded w-40">
                  <Image src={favorite.poster_path} alt={favorite.title} className="object-cover object-center" fill sizes="25vw"/>
                </div>
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