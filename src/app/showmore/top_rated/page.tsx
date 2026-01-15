import ClientTopRatedPage from "@/components/topRatedPage/ClientTopRatedPage"
import { Suspense } from "react"

const TopRatedPage = () => {
  return (
    <Suspense>
      <ClientTopRatedPage />
    </Suspense>
  )
}

export default TopRatedPage