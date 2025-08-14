"use client"

import useUser from "@/zustand/useUser"
import HeaderProfile from "./HeaderProfile"
import MyFavoritesMovie from "./MyFavoritesMovie"

const FAVORITES_MOVIE_SHOWED_IN_PROFILE = 4

const ClientMyProfilePage = () => {


  const { data } = useUser()

  console.log(data)

  return (
    <div className="px-4  relative text-white lg:px-12 ">
      <HeaderProfile data={data}/>
      <MyFavoritesMovie data={data?.favoritesMovie.slice(0,FAVORITES_MOVIE_SHOWED_IN_PROFILE)}/>
    </div>
  )
}

export default ClientMyProfilePage