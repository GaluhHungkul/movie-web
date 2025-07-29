import { Skeleton } from "../ui/skeleton"

const SkeletonDetailMovie = () => {
  return (
      <div className="lg:flex lg:space-x-10">
        <Skeleton className="text-white h-[80vh] text-center content-center lg:flex-1"/>
        <div className="my-10 space-y-4 md:space-y-5 lg:flex-1/3 lg:my-0">
            <Skeleton className="h-4 md:h-6 w-1/3"/>
            <div className="space-y-2">
                <Skeleton className="h-4 md:h-6 "/>
                <Skeleton className="h-4 md:h-6 "/>
                <Skeleton className="h-4 md:h-6 "/>
                <Skeleton className="h-4 md:h-6 w-3/4"/>
            </div>
            <Skeleton className="h-4 md:h-6 w-3/5"/>
            <Skeleton className="h-4 md:h-6 w-4/5"/>
        </div>
    </div>
  )
}

export default SkeletonDetailMovie