import { FC } from "react";
import SelectReleaseYear from "./SelectReleaseYear";
import { Button } from "../ui/button";
import { Clapperboard, Tv } from "lucide-react";


type Props ={
    handleChangeEndpoint : (val:"/tv/top_rated" | "/movie/top_rated") => void
}

const HeaderTopRatedPage : FC<Props> = ({ handleChangeEndpoint }) => {

  return (
    <div>
      <h1 className="text-center text-xl md:text-4xl">Top Rated</h1>
        <div className="flex items-center justify-between text-white/40 md:text-3xl mb-6 mt-6 md:mb-10">
          <section className="flex gap-2">
            <Button variant={"secondary"} className={`cursor-pointer flex items-center font-bold lg:text-lg`} onClick={() => handleChangeEndpoint("/movie/top_rated")}>Movie <Clapperboard className="lg:scale-125"/></Button>
            <Button variant={"secondary"} className={`cursor-pointer flex items-center font-bold lg:text-lg`} onClick={() => handleChangeEndpoint("/tv/top_rated")}>TV <Tv className="lg:scale-125"/></Button>
          </section>
          <SelectReleaseYear />          
        </div>
    </div>
  )
}

export default HeaderTopRatedPage