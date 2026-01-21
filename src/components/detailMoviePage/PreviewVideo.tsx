import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

const PreviewVideo = ({ preview_video_key } : { preview_video_key : string }) => {

  const [showVideo, setShowVideo] = useState(true)

  return (
    <div className={`fixed z-100 right-2 bottom-1 text-end md:w-96 lg:w-[400px]`}>
      <Button onClick={() => setShowVideo(p => !p)} title="Hide Preview video" variant={"secondary"} className="border mb-2 cursor-pointer">{showVideo ? <X /> : <span className="p-1">Show Video</span>}</Button>
      {showVideo && <iframe src={`https://www.youtube.com/embed/${preview_video_key}`} className="size-full rounded aspect-[16/9]"></iframe>}
    </div>
  )
}

export default PreviewVideo