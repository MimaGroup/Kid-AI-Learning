"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function DemoVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handlePlayClick = () => {
    const video = document.getElementById("demo-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteClick = () => {
    const video = document.getElementById("demo-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] via-white to-[#F0FDFA]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
            Oglejte si v akciji
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">
            Kako deluje KidsLearnAI
          </h2>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
            Poglejte 60-sekundni pregled naše platforme in odkrijte, kako vaš otrok lahko uči AI na zabaven način
          </p>
        </div>

        {/* Video container with placeholder */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#2D2A3D] aspect-video">
          {/* Placeholder image until video is added */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#6CD4C3] flex flex-col items-center justify-center text-white">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 hover:scale-110 transition-transform cursor-pointer"
                 onClick={handlePlayClick}>
              <Play className="w-12 h-12 text-white ml-1" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-2">Demo video kmalu prihaja</h3>
            <p className="text-white/80">Pripravljamo kratek pregled platforme</p>
          </div>

          {/* Actual video element (hidden until video URL is added) */}
          <video 
            id="demo-video"
            className="w-full h-full object-cover hidden"
            muted={isMuted}
            playsInline
            onEnded={() => setIsPlaying(false)}
            poster="/images/video-poster.jpg"
          >
            {/* Add video source when available */}
            {/* <source src="/videos/demo.mp4" type="video/mp4" /> */}
          </video>

          {/* Video controls overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 hover:opacity-100 transition-opacity hidden">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={handlePlayClick}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={handleMuteClick}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Feature highlights below video */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="text-center p-4">
            <div className="text-3xl font-heading font-bold text-[#7C3AED] mb-1">0:15</div>
            <div className="text-sm text-[#64748B]">Prijava in pregled</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-heading font-bold text-[#6CD4C3] mb-1">0:30</div>
            <div className="text-sm text-[#64748B]">AI igre v akciji</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-heading font-bold text-[#FCD34D] mb-1">0:45</div>
            <div className="text-sm text-[#64748B]">Starševski nadzor</div>
          </div>
        </div>
      </div>
    </section>
  )
}
