import Image from "next/image"

const DetailMovieBanner = ({ img } : { img : string }) => {
  return (
    <div className="hidden lg:block relative w-full h-screen">
      <Image src={img} alt="Banner Movie" fill sizes="100vw" className="object-cover object-center rounded"/>
    </div>
  )
}

export default DetailMovieBanner