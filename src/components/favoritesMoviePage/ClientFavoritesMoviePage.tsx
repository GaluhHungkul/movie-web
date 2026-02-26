"use client"

import MyFavoritesMovie from "../myprofilePage/MyFavoritesMovie"

const ClientFavoritesMoviePage = () => (
    <div className="container pb-20 md:pb-32 pt-10">
        <MyFavoritesMovie showMore={false}/>
    </div>
)


export default ClientFavoritesMoviePage