import { Skeleton } from "../ui/skeleton"

const SkeletonTopRated = () => {
  return (
    <div className="mt-2 container">
        <div>
            <Skeleton className="h-2 w-20 mx-auto mb-6 md:h-4 md:w-32"/>
            <div className="mb-6 mt-2 md:mt-6 md:mb-10">
                <section className="flex items-center gap-4 justify-evenly">
                    <Skeleton className="h-6 flex-1 lg:h-10"/>
                    <Skeleton className="h-6 flex-1 lg:h-10"/>
                </section>
                <Skeleton className="ml-auto h-4 w-32 mt-8"/>
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

export default SkeletonTopRated