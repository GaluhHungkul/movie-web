import Logo from "@/components/common/Logo"

const AllRightsReserved = () => {
  return (
    <div>
        <Logo />
        {/* <Image src="/assets/images/icon_full.png" width={400} height={400} className="w-20 h-9 mb-2 md:w-36 text-white md:h-16" alt="Chill" /> */}
        <p style={{color: "#C1C2C4"}} className="text-[12px] md:text-xl">@2023 Chill All Rights Reserved.</p>
    </div>
  )
}

export default AllRightsReserved