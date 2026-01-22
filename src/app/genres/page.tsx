import ClientGenresPage from "@/components/genresPage/ClientGenresPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Genres",
  description: "See all genres"
}

const GenresPage = () => {
  return <ClientGenresPage />
}

export default GenresPage