import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="
      fixed inset-0 z-50
      bg-white/10
      backdrop-blur-sm
      flex items-center justify-center
      min-h-screen
    ">
      <Spinner />
    </div>
  )
}
