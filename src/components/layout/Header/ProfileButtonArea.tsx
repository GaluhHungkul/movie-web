import Image from "next/image"
import default_pp from "@/../public/assets/img/default_pp.png"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import useUser from "@/zustand/useUser"
import { useEffect } from "react"

const ProfileButtonArea = () => {

  const { setUser } = useUser()

  const { data:session, status } = useSession()

  useEffect(() => {
    if(session?.user) setUser(session.user)
  },[session, setUser])

  if(status === "loading") return <div className="absolute right-3 border-4 border-r-white/50 border-b-white/50 animate-spin size-10 rounded-full "></div>

  

  return (
    <div className="absolute right-3 lg:right-12">
        {session ? 
        <Link href={"/"}>
            <section className="relative border size-10 rounded-full overflow-hidden cursor-pointer md:size-12">
                <Image fill src={default_pp} sizes="50vw" alt="User"/>
            </section>
        </Link> :
        <Button variant={"secondary"}><Link href={"/login"}>Login</Link></Button>
        }
    </div>
  )
}

export default ProfileButtonArea