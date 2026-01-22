import ClientMoviesPage from "@/components/moviesPage/ClientMoviesPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore Movies",
  description: "Explore a lot of movies"
}

const MoviesPage =  () => {

  return <ClientMoviesPage />
}

export default MoviesPage