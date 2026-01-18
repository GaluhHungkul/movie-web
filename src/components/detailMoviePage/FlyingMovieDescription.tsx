import { Calendar, Clock, Star } from "lucide-react"
import { Button } from "../ui/button"
import { TypeMovie } from "@/types/types-movie"


const FlyingMovieDescription = ({ data, handleAddToList, loadingSubmit } : { 
    data: { descriptionMovie: TypeMovie } | null
    handleAddToList: () => void;
    loadingSubmit: boolean
}) => {
  return (
    <section className="flex flex-col top-10 left-10 absolute lg:left-20">
        <h1 className="text-4xl text-white">{data?.descriptionMovie.title}</h1>
        <h1 className="mt-2 text-white/70">{data?.descriptionMovie.tagline}</h1>
        <div className="flex mb-6 mt-4 justify-start gap-8 flex-wrap lg:mb-12 lg:mt-6">
        <h2 className="text-lg flex items-center gap-2"><Star size={18} className="text-white"/>{data?.descriptionMovie.vote_average.toFixed(1) ?? "-"}</h2>
        <h2 className="text-lg flex items-center gap-2"><Clock size={18} className="text-white"/>{(() => {
            const runtime = data?.descriptionMovie.runtime ?? 0
            const hours = Math.floor(runtime / 60)
            const minutes = runtime % 60
            return `${hours}H ${minutes}M`
            })()}
        </h2>
        <h2 className="text-lg flex items-center gap-2"><Calendar size={18} className="text-white"/>{data?.descriptionMovie.release_date}</h2>
        </div>
        <h2 className="line-clamp-1 lg:line-clamp-5 w-2/3 text-lg"  title={data?.descriptionMovie.overview}>{data?.descriptionMovie.overview}</h2>
        <h1 className="hidden lg:inline mt-5 text-xl" title={data?.descriptionMovie.popularity.toString()}><span className="text-white ">{data?.descriptionMovie?.popularity ?? ""}</span> Popularity Points</h1>
        <Button onClick={handleAddToList} className="absolute -bottom-12 w-max bg-white text-black font-bold hover:bg-white/70 active:bg-white/50 cursor-pointer lg:-bottom-40 lg:text-xl lg:px-8 lg:py-6" disabled={loadingSubmit}>Add to List</Button>
    </section>
  )
}

export default FlyingMovieDescription