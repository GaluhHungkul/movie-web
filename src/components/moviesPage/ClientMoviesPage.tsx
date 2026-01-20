"use client"

import GridMovieList from "../common/GridMovieList"
import SwiperMovieList from "../homePage/SwiperMovieList"
import Banner from "../common/Banner"

const ClientMoviesPage = () => {
  return (
    <div className='min-h-screen container'>
      <Banner />
      <div className="mb-8"/>
      <SwiperMovieList endpoint="/movie/upcoming" href="/movies/showmore/upcoming" title="Upcoming Movies" reverse/>
      <div className="my-13 h-px bg-gradient-to-r from-transparent via-border to-primary" />
      <SwiperMovieList endpoint="/movie/now_playing" href="/movies/showmore/now_playing" title="Now Playing Movies" />
      <div className="my-12 h-px bg-gradient-to-l from-transparent via-border to-primary" />
      <GridMovieList endpoint="/movie/popular" title="Popular Movie" popular/>
    </div>
  )
}

export default ClientMoviesPage