"use client"

import GridMovieList from "../common/GridMovieList"
import SwiperMovieList from "../homePage/SwiperMovieList"
import Banner from "./Banner"

const ClientMoviesPage = () => {
  return (
    <div className='min-h-screen'>
      <Banner />
      <div className="mb-8"/>
      <SwiperMovieList endpoint="/movie/upcoming" href="/movies/upcoming" title="Upcoming Movies" reverse/>
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-border to-my-primary" />
      <SwiperMovieList endpoint="/movie/now_playing" href="/movies/now_playing" title="Now Playing Movies" />
      <div className="my-12 h-px bg-gradient-to-l from-transparent via-border to-my-primary" />
      <GridMovieList endpoint="/movie/popular" title="Popular Movie" popular/>
    </div>
  )
}

export default ClientMoviesPage