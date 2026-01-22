import { movieGenres, tvGenres } from "@/lib/data/genres"
import { TmdbSearchMovie, TmdbSearchPerson, TmdbSearchResult, TmdbSearchTv } from "@/types/types-search"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const SearchedCard = ({ data } : { data: TmdbSearchResult }) => {


  return data.media_type === "person" 
        ? <PersonCase {...data}/> 
        : (
            data.media_type === "movie" 
            ? <MovieCase {...data} />
            : <TvCase {...data} />
        )
}

export default SearchedCard

const MovieCase = ({ id, title, poster_path, genre_ids, release_date, vote_average, media_type }:TmdbSearchMovie) => {
    return (
        <Link href={`/movies/detail/${id}`} className="flex gap-4 hover:bg-black-12">

            <div className="relative aspect-[2/3] flex-1 shrink-0">
                <Image src={poster_path!} alt={title} fill sizes="50vw" className="object-cover object-center rounded"/>
            </div>
            <div className="flex-2 py-2">
                <h1 className="line-clamp-2">{title}</h1>
                <div className="my-2 flex gap-1 items-center">
                    <h2>{release_date ?  release_date.split("-")[0] : "--"} <span className="mx-1">|</span> </h2>
                    <h2 className="flex gap-1 items-center">{vote_average.toFixed(1)} <Star className="relative bottom-0.5" size={18}/></h2>
                </div>
                <h1 className="text-muted-foreground">{media_type}</h1>
                <h1 className="flex mt-2 flex-wrap gap-x-2 text-sm">{genre_ids.map((g,i) => <span key={g}>{movieGenres.find(v => v.id === g)?.name}{i !== genre_ids.length - 1 && ","}</span>)}</h1> 
            </div>
        </Link>
    )
}

const TvCase = ({ id, name, poster_path, genre_ids, first_air_date, media_type, vote_average }: TmdbSearchTv) => {
    return (
        <Link href={`/tv/detail/${id}`} className="flex gap-4 hover:bg-black-12">
            <div className="relative aspect-[2/3] flex-1 shrink-0">
                <Image src={poster_path!} alt={name} fill sizes="50vw" className="object-cover object-center rounded"/>
            </div>
            <div className="flex-2 py-2">
                <h1 className="line-clamp-2">{name}</h1>
                <div className="my-2 flex gap-1 items-center">
                    <h2>{first_air_date ? first_air_date.split("-")[0] : "--"} <span className="mx-1">|</span> </h2>
                    <h2 className="flex gap-1 items-center">{vote_average.toFixed(1)} <Star className="relative bottom-0.5" size={18}/></h2>
                </div>
                <h1 className="text-muted-foreground">{media_type}</h1>
                <h1 className="flex mt-2 flex-wrap gap-x-2 text-sm">{genre_ids.map((g,i) => <span key={g}>{tvGenres.find(v => v.id === g)?.name}{i !== genre_ids.length - 1 && ","}</span>)}</h1> 
            </div>
        </Link>
    )
}
 
const PersonCase = ({ gender, name, profile_path, known_for_department, media_type }: TmdbSearchPerson) => {

    const real_gender = gender === 1 ? "Female" : (gender === 2 ? "Male" : "Not Specified")
    return (
        <div className="flex items-center gap-4">
            <div className="relative aspect-square rounded-full flex-1">
                <Image src={profile_path!} alt={name} fill sizes="40vw" className="object-cover object-center rounded-full"/>
            </div>
            <div className="flex-2 space-y-2">
                <h1>{name}</h1>
                <h2>Gender: {real_gender}</h2>
                <h2>{media_type}</h2>
                <p>{known_for_department}</p>
            </div>
        </div>
    )
}