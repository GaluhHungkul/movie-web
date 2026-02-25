import { Skeleton } from "../ui/skeleton"

const SkeletonGridMovieList = ({ filter=true } : { filter?: boolean }) => {
  return (
    <>
      {filter && 
      <>
        <Skeleton className="h-6 w-32"/>
        <Skeleton className="mt-8 h-8 w-44 ml-auto"/>
      </>
      }
      <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4 lg:grid-cols-5 w-full">
          {Array.from({length : 20}).map((_,i) => (
            <Skeleton key={i} className="aspect-[2/3]"/>
          ))}
      </div>
    </>
  )
}

export default SkeletonGridMovieList