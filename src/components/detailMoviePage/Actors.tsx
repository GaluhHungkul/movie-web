import { Cast } from "@/types/types-movie"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "../ui/card"

const Actors = ({ data } : { data: Cast[] }) => {
  return (
    <div className="mt-10 lg:mt-16">
        <h1 className="md:text-xl lg:text-2xl">Actors</h1>
        <section className="grid gap-4 grid-cols-2 mt-6 md:grid-cols-3 lg:grid-cols-4">
            {data.map(actor => (
                <Card className="flex items-center gap-6 border border-white/20 rounded-lg p-2 md:px-4 lg:py-4 hover:scale-105 duration-200" key={actor.id}>
                    <CardContent>
                        <Image
                            src={actor.profile_path}
                            alt={actor.name}
                            width={100}
                            height={100}
                            className="rounded-full object-cover object-center aspect-square"
                        />
                        <p className="line-clamp-2 mt-4 font-medium">{actor.name}</p>
                    </CardContent>
                    <CardFooter>
                        <p className="line-clamp-2 text-sm text-white/70">{actor.character}</p>
                    </CardFooter>
                </Card>
            ))}
        </section>
    </div>
  )
}

export default Actors