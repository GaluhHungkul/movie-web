import Image from "next/image"

const MoviePoster = ({ poster_path, alt } : { poster_path : string, alt : string }) => {
  return (
    <div className=" aspect-[2/3] rounded overflow-hidden relative">
        <Image src={poster_path} alt={alt} fill/> 
    </div> 
  )
}

export default MoviePoster