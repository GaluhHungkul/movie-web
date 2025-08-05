import { X } from "lucide-react"
import { useState } from "react"

const PreviewVideo = ({ preview_video_key } : { preview_video_key : string }) => {

    const [showVideo, setShowVideo] = useState(true)

  return (
    <div className={`fixed lg:static z-10 right-2 bottom-1 text-end lg:w-[500px]`}>
      <button onClick={() => setShowVideo(p => !p)} title="Hide Preview video" className=" bg-white/70 hover:bg-white/90 active:bg-white cursor-pointer text-black lg:hidden">{showVideo ? <X /> : <span className="p-1">Show Video</span>}</button>
      {showVideo && <iframe src={`https://www.youtube.com/embed/${preview_video_key}`} className="size-full rounded aspect-[16/9]"></iframe>}
    </div>
  )
}

export default PreviewVideo