import Image from "next/image"

const HeaderAuthCard = ({ registerPage=false } : { registerPage? : boolean }) => {
  return (
    <div>
      <section className="relative h-28 scale-50 md:h-40 lg:bottom-5">
        <Image src={"/assets/images/icon_full.png"} alt="Chill" fill sizes="50vw"/>
      </section> 
      <h1 className="text-center text-white/70  text-sm relative bottom-6 lg:bottom-12 md:text-xl">Selamat Datang {!registerPage && "Kembali"}</h1>
    </div>
  )
}

export default HeaderAuthCard