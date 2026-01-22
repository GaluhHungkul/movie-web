import ClientTopRatedPage from "@/components/topRatedPage/ClientTopRatedPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Rated Shows",
  description: "Top rated shows"
}

const TopRatedPage = () => {
  return <ClientTopRatedPage />
}

export default TopRatedPage