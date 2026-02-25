"use client"

import useUser from "@/store/useUser"
import MyFavoritesMovie from "../myprofilePage/MyFavoritesMovie"

const ClientFavoritesMoviePage = () => {

    const { user } = useUser()

  return <MyFavoritesMovie data={user?.favoritesMovie} showMore={false}/>
}

export default ClientFavoritesMoviePage