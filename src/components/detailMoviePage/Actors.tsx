import { Cast } from "@/types/types-movie"
import Image from "next/image"

const Actors = ({ data } : { data: Cast[] }) => {
  return (
    <div className="mt-10 lg:mt-16">
        <h1 className="md:text-xl lg:text-2xl">Actors</h1>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {data.map(actor => (
                <div className="flex items-center gap-6 border border-white/20 rounded-lg p-2 md:px-4 lg:py-4" key={actor.id}>
                    <Image
                        src={actor.profile_path}
                        alt={actor.name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover object-center aspect-square"
                    />

                    <div>
                        <p className="line-clamp-2 font-medium">{actor.name}</p>
                        <p className="line-clamp-2 text-sm text-white/70">
                        {actor.character}
                        </p>
                    </div>
                    </div>

            ))}
        </section>
    </div>
  )
}

export default Actors