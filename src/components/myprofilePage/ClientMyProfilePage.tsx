"use client"

import useUser from "@/zustand/useUser"
import HeaderProfile from "./HeaderProfile"
import MyFavoritesMovie from "./MyFavoritesMovie"

const ClientMyProfilePage = () => {


  const { data } = useUser()

  return (
    <div className="min-h-screen  px-4  relative text-white lg:px-12 ">
      <HeaderProfile data={data}/>
      <MyFavoritesMovie userId={data?.id}/>
    </div>
  )
}

export default ClientMyProfilePage