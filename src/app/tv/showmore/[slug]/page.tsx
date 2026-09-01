import ClientShowmoreTvPage from "@/components/showmoveTvPage/ClientShowmoreTvPage";
import { redirect } from "next/navigation";

type Props = {
  params : Promise<{ slug : string }>;
}

const ShowmoreTvPage = async ({
    params
}: Props) => {
    const { slug } = await params

    if(!["airing_today", "on_the_air"].includes(slug)) redirect("/tv/showmore/airing_today")

  return <ClientShowmoreTvPage slug={slug}/>
}

export default ShowmoreTvPage