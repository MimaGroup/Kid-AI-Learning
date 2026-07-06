import Image from "next/image"
import { BYTE_CHARACTER, type ByteImageKey } from "@/lib/byte-character"

interface ByteMascotProps {
  variant?: ByteImageKey
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showName?: boolean
  speechBubble?: string
}

const sizeMap = {
  sm: { width: 48, height: 48, containerClass: "w-12 h-12" },
  md: { width: 80, height: 80, containerClass: "w-20 h-20" },
  lg: { width: 120, height: 120, containerClass: "w-[120px] h-[120px]" },
  xl: { width: 200, height: 200, containerClass: "w-[200px] h-[200px]" },
}

export function ByteMascot({
  variant = "avatar",
  size = "md",
  className = "",
  showName = false,
  speechBubble,
}: ByteMascotProps) {
  const { width, height, containerClass } = sizeMap[size]
  const imageSrc = BYTE_CHARACTER.images[variant]

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative">
        <div className={`${containerClass} relative rounded-full overflow-hidden ring-2 ring-purple-200 shadow-lg`}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={BYTE_CHARACTER.fullName}
            width={width}
            height={height}
            className="object-cover w-full h-full"
          />
        </div>
        {speechBubble && (
          <div className="absolute -top-2 left-full ml-3 bg-foreground text-background text-sm px-3 py-2 rounded-xl rounded-bl-sm shadow-md max-w-[200px] whitespace-normal">
            {speechBubble}
          </div>
        )}
      </div>
      {showName && (
        <span className="text-sm font-bold text-purple-700">{BYTE_CHARACTER.name}</span>
      )}
    </div>
  )
}

interface ByteBannerProps {
  title: string
  subtitle?: string
  variant?: ByteImageKey
  className?: string
}

export function ByteBanner({ title, subtitle, variant = "waving", className = "" }: ByteBannerProps) {
  return (
    <div
      className={`relative bg-gradient-to-r from-purple-500 via-purple-600 to-teal-500 text-white p-6 rounded-3xl shadow-xl overflow-hidden ${className}`}
    >
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-90">
        <Image
          src={BYTE_CHARACTER.images[variant] || "/placeholder.svg"}
          alt={BYTE_CHARACTER.fullName}
          width={100}
          height={100}
          className="rounded-full ring-2 ring-white/30"
        />
      </div>
      <div className="relative z-10 pr-28">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-purple-100 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

interface ByteTipProps {
  message: string
  className?: string
}

export function ByteTip({ message, className = "" }: ByteTipProps) {
  return (
    <div className={`flex items-start gap-4 bg-purple-50 border border-purple-200 rounded-2xl p-4 ${className}`}>
      <div className="flex-shrink-0">
        <ByteMascot variant="teaching" size="sm" />
      </div>
      <div>
        <p className="text-sm font-semibold text-purple-700">Byte pravi:</p>
        <p className="text-sm text-purple-900 mt-1">{message}</p>
      </div>
    </div>
  )
}
