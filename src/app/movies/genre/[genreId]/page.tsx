import GridMovieList from "@/components/common/GridMovieList"

import { FC } from 'react';

type PageProps = {
  params: {
    genreId: string;
  };
}

const MoviesByGenrePage : FC<PageProps> = async ({ params : { genreId }}) => {

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-10">Genre Id {genreId}</h1>
      <GridMovieList endpoint={`/discover/movie?with_genres=${genreId}`}/>
    </div>
  )
}

export default MoviesByGenrePage