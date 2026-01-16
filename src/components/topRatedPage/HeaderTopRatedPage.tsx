import { FC } from "react";
import SelectReleaseYear from "./SelectReleaseYear";
import { Button } from "../ui/button";
import { Clapperboard, Tv } from "lucide-react";


type Props ={
    endpoint : string;
    handleChangeEndpoint : (val:"/tv/top_rated" | "/movie/top_rated") => void
}

const HeaderTopRatedPage : FC<Props> = ({ endpoint, handleChangeEndpoint }) => {

  return (
    <div>
      <h1 className="text-center text-xl md:text-4xl">Top Rated</h1>
      <section className="mb-6 mt-6 md:mb-10">
        <div className="flex items-center gap-4 text-white/40 md:text-3xl">
          <Button variant={"secondary"} disabled={endpoint.includes("movie")} className={`cursor-pointer flex items-center font-bold flex-1 lg:py-6 lg:text-lg`} onClick={() => handleChangeEndpoint("/movie/top_rated")}>Movie <Clapperboard className="lg:scale-125"/></Button>
          <Button variant={"secondary"} disabled={!endpoint.includes("movie")} className={`cursor-pointer flex items-center font-bold flex-1 lg:py-6 lg:text-lg`} onClick={() => handleChangeEndpoint("/tv/top_rated")}>TV <Tv className="lg:scale-125"/></Button>
        </div>
        <SelectReleaseYear />          
      </section>
    </div>
  )
}

export default HeaderTopRatedPage