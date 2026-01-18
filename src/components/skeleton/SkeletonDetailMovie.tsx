import { Skeleton } from "../ui/skeleton"

const SkeletonDetailMovie = () => {
  return (
      <div className="lg:space-x-10">
        <Skeleton className="text-white h-[80vh] text-center content-center lg:w-full lg:aspect-[16/9]"/>
        <Skeleton className="hidden lg:block aspect-[16/9] w-[500px] mt-10"/>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6 my-10">
          {Array(12).fill(null).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/1]"/>
          ))}
        </div>
        <div className="my-10 space-y-4 md:space-y-5 lg:hidden">
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