import Image from "next/image"


const PhotoProfile = ({ image } : { image : string | null | undefined }) => {

  return (
    <section className="relative size-16">
        <Image src={image ?? "/assets/img/default_pp.png"} className="rounded-full" alt="Profile" fill sizes="40vw"/>
    </section>
  )
}

export default PhotoProfile