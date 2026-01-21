import { FC } from "react";

type Props ={
    endpoint : string;
    handleChangeEndpoint : (val:"/movie/popular" | "/tv/popular") => void
}

const HeaderPopularityPage : FC<Props> = ({ endpoint, handleChangeEndpoint }) => {
  return (
    <div>
        <h1 className="text-center text-xl md:text-4xl">Popularity</h1>
        <div className="flex items-center justify-evenly mb-6 mt-2 font-semibold text-white/40 md:text-3xl md:mt-6 md:mb-10">
            <span className={`${endpoint === "/movie/popular" ? "text-white " : "hover:text-white/70"} cursor-pointer`} onClick={() => handleChangeEndpoint("/movie/popular")}>Movie</span>
            <span className={`${endpoint === "/tv/popular" ? "text-white " : "hover:text-white/70"} cursor-pointer`} onClick={() => handleChangeEndpoint("/tv/popular")}>TV</span>
        </div>
    </div>
  )
}

export default HeaderPopularityPage