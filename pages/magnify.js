import Image from "next/image";
import { useState } from "react";

const img = {
  url: '/images/camera.jpg',
  alt: 'Image of a camera'
}

const MAGNIFY_SIZE = 200
const MAGNIFY_SIZE_HALF = MAGNIFY_SIZE / 2


export default function Magnify() {
  const [magnifyStyle, setMagnifyStyle] = useState({ backgroundImage: `url(${img.url})` })

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent
    const { offsetWidth, offsetHeight } = target

    const xPercentage = (offsetX / offsetWidth) * 100
    const yPercentage = (offsetY / offsetHeight) * 100

    setMagnifyStyle((prev) => ({
      ...prev,
      display: 'block',
      top: `${offsetY - MAGNIFY_SIZE_HALF}px`,
      left: `${offsetX - MAGNIFY_SIZE_HALF}px`,
      backgroundPosition: `${xPercentage}% ${yPercentage}%`
    }))
  }

  const handleMouseLeave = (e) => {
    setMagnifyStyle((prev) => ({ ...prev, display: 'none' }))
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
      <div className="relative border-2 border-white cursor-none">
        <Image
          src={img.url}
          alt={img.alt}
          width={600}
          height={600}
          draggable={false}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        />
        <div className="magnify" style={magnifyStyle}></div>
      </div>
    </div>
  );
}
