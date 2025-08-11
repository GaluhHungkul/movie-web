"use client"

import useUser from "@/zustand/useUser"
import Image from "next/image"


const ProfileCard = () => {

  const { data } = useUser()

  return (
    <div className="mt-4">
        <section className="flex mb-8 lg:items-center border relative size-16 rounded-full mx-auto overflow-hidden">
            <Image  src={data?.image ?? ""} alt="Profile" fill sizes="40vw" />
        </section>
    </div>
  )
}

export default ProfileCard