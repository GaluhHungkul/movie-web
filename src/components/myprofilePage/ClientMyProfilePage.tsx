"use client"

import useUser from "@/zustand/useUser"
import HeaderProfile from "./HeaderProfile"
import MyFavoritesMovie from "./MyFavoritesMovie"

const ClientMyProfilePage = () => {


  const { data } = useUser()

  console.log(data)

  return (
    <div className="min-h-screen  px-4  relative text-white lg:px-12 ">
      <HeaderProfile data={data}/>
      <MyFavoritesMovie data={data?.favoritesMovie}/>
    </div>
  )
}

export default ClientMyProfilePage