import { Skeleton } from "../ui/skeleton"

const SkeletonDetailMovie = () => {
  return (
      <div className="lg:space-x-10 container">
        <Skeleton className="text-white aspect-[2/3] text-center content-center lg:w-full md:aspect-[16/9]"/>
        <div className="md:flex md:gap-8 md:mt-8 md:h-[500px]">
          <Skeleton className="flex-1 aspect-[2/3] hidden md:block"/>
          <div className="my-10 space-y-8 md:space-y-5 md:flex-2">
              <Skeleton className="h-4 md:h-6 w-1/3"/>
              <div className="space-y-4">
                  <Skeleton className="h-4 md:h-6 "/>
                  <Skeleton className="h-4 md:h-6 "/>
                  <Skeleton className="h-4 md:h-6 "/>
                  <Skeleton className="h-4 md:h-6 w-3/4"/>
              </div>
              <Skeleton className="h-4 md:h-6 w-3/5"/>
              <Skeleton className="h-4 md:h-6 w-4/5"/>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 my-10">
          {Array(12).fill(null).map((_, i) => (
            <Skeleton key={i} className="aspect-square"/>
          ))}
        </div>
    </div>
  )
}

export default SkeletonDetailMovie