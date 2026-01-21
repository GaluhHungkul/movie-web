import Image from "next/image"

const DetailMovieBanner = ({ img } : { img : string }) => {
  return (
    <div className="relative hidden md:block aspect-[16/9] w-full rounded lg:flex-2">
      <div className="hidden md:block absolute inset-x-0 h-6 bottom-0  bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
      <div className="hidden md:block absolute inset-x-0 h-2 top-0  bg-gradient-to-b from-black via-black/30 to-transparent z-10" />
      <div className="hidden md:block absolute inset-y-0 w-2 left-0  bg-gradient-to-r from-black via-black/30 to-transparent z-10" />
      <div className="hidden md:block absolute inset-y-0 w-2 right-0  bg-gradient-to-l from-black via-black/30 to-transparent z-10" />
      <Image src={img} alt="Banner Movie" fill sizes="100vw" className="object-cover object-center rounded"/>
    </div>
  )
}

export default DetailMovieBanner