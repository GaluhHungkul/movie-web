import { FC } from "react";

type Props ={
    endpoint : string;
    handleChangeEndpoint : (val:"/tv/top_rated" | "/movie/top_rated") => void
}

const HeaderTopRatedPage : FC<Props> = ({ endpoint, handleChangeEndpoint }) => {
  return (
    <div>
        <h1 className="text-center text-xl md:text-4xl">Top Rated</h1>
        <div className="flex items-center justify-evenly mb-6 mt-2 font-semibold text-white/40 md:text-3xl md:mt-6 md:mb-10">
            <span className={`${endpoint === "/movie/top_rated" ? "text-white " : "hover:text-white/70"} cursor-pointer`} onClick={() => handleChangeEndpoint("/movie/top_rated")}>Movie</span>
            <span className={`${endpoint === "/tv/top_rated" ? "text-white " : "hover:text-white/70"} cursor-pointer`} onClick={() => handleChangeEndpoint("/tv/top_rated")}>TV</span>
        </div>
    </div>
  )
}

export default HeaderTopRatedPage