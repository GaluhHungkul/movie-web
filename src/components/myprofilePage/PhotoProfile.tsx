import Image from "next/image"


const PhotoProfile = ({ image } : { image : string | null | undefined }) => {

  return (
    <section className="flex mb-8 lg:items-center relative size-32 rounded-full mx-auto overflow-hidden mt-4">
        <Image  src={image ?? "/assets/images/default_pp.png"} alt="Profile" fill sizes="40vw" />
    </section>
  )
}

export default PhotoProfile