import GenreList from "@/components/genreListPage/GenreList"

//! index 0 for movie
//! index 1 for tv

const ListGenrePage = () => {
  
  return (
    <>
      <GenreList title="Movie Genre"  index={0}/>
      <GenreList title="TV Genre" index={1}/>
    </>
  )
}

export default ListGenrePage