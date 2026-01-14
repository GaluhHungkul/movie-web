export default function Loading() {
  return (
    <div className="
      fixed inset-0 z-50
      bg-white/10
      backdrop-blur-sm
      flex items-center justify-center
      min-h-screen
    ">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800" />
    </div>
  )
}
