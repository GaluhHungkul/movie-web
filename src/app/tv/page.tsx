import ClientTvPage from "@/components/tvPage/ClientTvPage";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore TV Series",
  description: "Explore a lot of tv series"
}

const TvPage = () => <ClientTvPage />

export default TvPage