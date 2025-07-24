import { Skeleton } from "../ui/skeleton"

const SkeletonGenreList = () => {
  return (
    <div className="mb-20">
        <Skeleton className="h-4 mx-auto w-52 mb-10"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-y-4">
            {Array(19).fill(null).map((_,i) => (
                <Skeleton key={i} className="h-3 w-32"/>
            ))}
        </div>
    </div>
  )
}

export default SkeletonGenreList