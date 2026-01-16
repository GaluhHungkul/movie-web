import GenreList from "@/components/common/GenreList"

//! index 0 for movie
//! index 1 for tv

const ListGenrePage = () => {
  
  return (
    <>
      <GenreList title="Movie Genre"  index={0} href={`/movies/genre`}/>
      <GenreList title="TV Genre" index={1} href={`/tv/genre`}/>
    </>
  )
}

export default ListGenrePage