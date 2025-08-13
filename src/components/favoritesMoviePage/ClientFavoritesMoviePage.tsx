"use client"

import useUser from "@/zustand/useUser"
import MyFavoritesMovie from "../myprofilePage/MyFavoritesMovie"

const ClientFavoritesMoviePage = () => {

    const { data } = useUser()

  return <MyFavoritesMovie data={data?.favoritesMovie} showMore={false}/>
}

export default ClientFavoritesMoviePage