import { Skeleton } from "../ui/skeleton"

const SkeletonGridMovieList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 w-full  ">
        {Array.from({length : 20}).map((_,i) => (
            <Skeleton key={i} className="aspect-[2/3]"/>
        ))}
    </div>
  )
}

export default SkeletonGridMovieList