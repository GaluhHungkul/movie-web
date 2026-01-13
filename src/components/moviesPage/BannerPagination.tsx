const BannerPagination = ({ length, activeIndex, onClick=() => {} } : { length: number; onClick?: (val:number) => void; activeIndex: number;}) => {
  return Array(length).fill(null).map((_, index) => (
        <button
        key={index}
        onClick={() => onClick(index)}
        className={`
            h-1.5 w-6 rounded-full transition-all duration-300 cursor-pointer
            ${activeIndex === index 
            ? "bg-my-primary w-10" 
            : "bg-white/40"}
        `}
        />
    ))
  
}

export default BannerPagination