"use client"

import GridMovieList from "../common/GridMovieList"
import SwiperMovieList from "../homePage/SwiperMovieList"
import Banner from "../moviesPage/Banner"

const ClientTvPage = () => {
  return (
    <div className="min-h-screen">
        <Banner tv/>
        <div className="mb-8"/>
        <SwiperMovieList tv endpoint="/tv/airing_today" href="/tv/showmore/airing_today" title="Airing Today" reverse/>
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-border to-my-primary" />
        <SwiperMovieList tv endpoint="/tv/on_the_air" href="/tv/showmore/on_the_air" title="On the Air" />
        <div className="my-12 h-px bg-gradient-to-l from-transparent via-border to-my-primary" />
        <GridMovieList isMovie={false} endpoint="/tv/popular" title="Popular TV Series" popular/>
    </div>
  )
}

export default ClientTvPage