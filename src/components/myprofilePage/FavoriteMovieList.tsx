import { FavoriteMovie } from "@prisma/client"
import FavoriteMovieCard from "./FavoriteMovieCard"

const FavoriteMovieList = ({ data } : { data: FavoriteMovie[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 ">
      {data.map((favorite) => <FavoriteMovieCard key={favorite.id} {...favorite}/>)}
    </div> 
  )
}

export default FavoriteMovieList