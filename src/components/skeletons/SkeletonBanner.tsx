import { Skeleton } from "../ui/skeleton"

const SkeletonBanner = () => (
    <>
        <Skeleton className="aspect-[9/16] relative md:aspect-[3/2] lg:aspect-[2/1]" />
        <div className="flex gap-2 mt-2 justify-center">
            {Array(5).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-1.5 w-6 "/>
            ))}
        </div>
    </>
)

export default SkeletonBanner