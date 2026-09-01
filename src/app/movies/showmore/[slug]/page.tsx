import ClientShowmoreMoviesPage from "@/components/showmoreMoviesPage/ClientShowmoreMoviesPage";
import { redirect } from "next/navigation";

type Props = {
  params : Promise<{ slug : string }>;
}

const ShowmoreMoviesPage = async ({
    params
}: Props) => {
    const { slug } = await params

    if(!["upcoming", "now_playing"].includes(slug)) redirect("/movies/showmore/upcoming")

  return <ClientShowmoreMoviesPage slug={slug}/>
}

export default ShowmoreMoviesPage