import ClientTopRatedPage from "@/components/top_ratedPage/ClientTopRatedPage"
import { Suspense } from "react"

const TopRatedPage = () => {
  return (
    <Suspense>
      <ClientTopRatedPage />
    </Suspense>
  )
}

export default TopRatedPage