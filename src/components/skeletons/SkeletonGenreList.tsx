import { Skeleton } from "../ui/skeleton"

const SkeletonGenreList = () => {
  return (
    <div className="pb-10 min-h-screen">
        <Skeleton className="h-8 mx-auto w-52 my-5 md:my-10"/>
        <div className="grid grid-cols-2 gap-4 font-medium text-lg md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {Array(19).fill(null).map((_,i) => (
                <Skeleton key={i} className="aspect-[2/3]"/>
            ))}
        </div>
    </div>
  )
}

export default SkeletonGenreList