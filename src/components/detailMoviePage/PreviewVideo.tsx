import { X } from "lucide-react"
import { useState } from "react"

const PreviewVideo = ({ preview_video_key } : { preview_video_key : string }) => {

    const [showVideo, setShowVideo] = useState(true)

  return (
    <div className={`fixed z-10 right-2 bottom-1 text-end`}>
        <button onClick={() => setShowVideo(p => !p)} title="Hide Preview video" className=" bg-white/70 hover:bg-white/90 active:bg-white cursor-pointer text-black">{showVideo ? <X /> : <span className="p-1">Show Video</span>}</button>
        {showVideo && <iframe
        src={`https://www.youtube.com/embed/${preview_video_key}`} 
        ></iframe>}
    </div>
  )
}

export default PreviewVideo