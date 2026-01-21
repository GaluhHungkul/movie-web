import Image from "next/image"

const MoviePoster = ({ poster_path, alt } : { poster_path : string, alt : string }) => {
  return (
    <div className="aspect-[2/3] relative rounded z-10 overflow-hidden flex-1">
      <Image src={poster_path} alt={alt} fill className="object-cover object-center"/>  
    </div> 
  )
}

export default MoviePoster