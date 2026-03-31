import ClientMyProfilePage from "@/components/myprofilePage/ClientMyProfilePage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Profile",
  description: "My information profile"
}

const MyProfilePage = () => {

  return <ClientMyProfilePage />

}

export default MyProfilePage