"use client"

import GenreList from "../common/GenreList"

const ClientGenresPage = () => {
  return (
    <div className="container min-h-screen">
      <GenreList />
      <GenreList tv/>
    </div>
  )
}

export default ClientGenresPage