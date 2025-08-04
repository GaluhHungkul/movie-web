import { Skeleton } from "../ui/skeleton"

const SkeletonPopularList = () => {
  return (
    <div className="mt-2">
        <div>
            <h1 className="text-center text-xl md:text-4xl">Popularity</h1>
            <div className="flex items-center justify-evenly mb-6 mt-2  md:mt-6 md:mb-10">
                <Skeleton className="h-2 w-20 md:h-4 md:w-32"/>
                <Skeleton className="h-2 w-20 md:h-4 md:w-32"/>
            </div>
        </div>
        <div className="flex flex-col gap-2 lg:w-4/5 mx-auto">
            {Array(10).fill(null).map((_,i) => (            
                <div key={i} className="w-full relative flex group rounded overflow-hidden h-42 md:h-96">
                    <Skeleton  className="w-32 md:w-80"/>
                    <div className="p-3 md:px-8 md:py-5">
                        <Skeleton className="h-2 w-28  mb-4 md:mb-6 md:h-4 md:w-40"/>
                        <Skeleton className="h-2 w-32 md:h-4 md:w-48"/>
                        <Skeleton className="h-2 w-24 my-2 md:my-4 md:h-4 md:w-36"/>
                        <div className="flex flex-wrap gap-3 md:h-4">
                            {Array(3).fill(null).map((_,i) => (
                                <Skeleton className="h-2 w-10 mt-8 md:mt-10 md:w-20 md:h-4" key={i}/>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SkeletonPopularList