// import FlyingSearchMovieButton from "@/components/moviesPage/FlyingSearchMovieButton"
import { ReactNode } from "react"

const MoviesPageLayout = ({ children } : { children: ReactNode }) => {
  return (
    <div>
        {children}
        {/* <FlyingSearchMovieButton /> */}
    </div>
  )
}

export default MoviesPageLayout