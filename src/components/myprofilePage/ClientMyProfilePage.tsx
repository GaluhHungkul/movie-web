"use client"

import MyFavoritesMovie from "./MyFavoritesMovie"
import MyProfileCard from "./MyProfileCard"
import SubscribtionCard from "./SubscribtionCard"


const ClientMyProfilePage = () => {

  return (
    <div className="container space-y-10 pb-20 md:pb-32 lg:pt-10">
      <section className="flex gap-10 flex-col md:flex-row">
        <SubscribtionCard />
        <MyProfileCard />
      </section>
      <MyFavoritesMovie />
    </div>
  )
}

export default ClientMyProfilePage