import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner";

const LoadMoreButton = ({ onClick, isFetchingNextPage } : { onClick: () => void; isFetchingNextPage: boolean }) => {
  return (
    <Button disabled={isFetchingNextPage} variant={"secondary"} onClick={() => onClick()} className="mx-auto mt-10 cursor-pointer font-bold">
        {isFetchingNextPage ? <Spinner /> : "Load More"}
    </Button>
  )
}

export default LoadMoreButton