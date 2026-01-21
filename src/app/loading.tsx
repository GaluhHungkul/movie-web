import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-screen">
      <div className="
        backdrop-blur-sm 
        fixed w-full left-0 top-0
        bg-white/10
        flex items-center justify-center
        h-screen
      ">
        <Spinner className="size-14"/>
      </div>
    </div>
  )
}
