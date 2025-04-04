import { useEffect, useState } from 'react'

interface WatermarkProps {
  watermarkIcon: string
  watermarksCount?: number
  customOpacity?: boolean
  rotate?: boolean
  customMinSize?: number
  customMaxSize?: number
}

const getRandomPosition = () => ({
  top: Math.random() * 100,
  left: Math.random() * 100
})

const getRandomOpacity = () => Math.random()

export default function Watermark({
  watermarkIcon,
  watermarksCount = 5,
  customOpacity = false,
  rotate = false,
  customMaxSize,
  customMinSize
}: WatermarkProps) {
  const [watermarks, setWatermarks] = useState<{ top: number; left: number; size: number; opacity: number }[]>([])

  // const getRandomSize = () => Math.random() * 55 + 35
  const getRandomSize = () => {
    const minSize = customMinSize || 35
    const maxSize = customMaxSize || 55
    return Math.random() * maxSize + minSize
  } // 35 ile 90 arasında rastgele boyut

  useEffect(() => {
    const newWatermarks = Array.from({ length: watermarksCount }).map(() => ({
      ...getRandomPosition(),
      size: getRandomSize(),
      opacity: customOpacity ? getRandomOpacity() : 0.1
    }))

    setWatermarks(newWatermarks)
  }, [])

  return (
    <>
      {watermarks.map((watermark, index) => (
        <img
          key={index}
          src={watermarkIcon}
          style={{
            position: 'absolute',
            top: `${watermark.top}%`,
            left: `${watermark.left}%`,
            width: `${watermark.size}px`,
            height: `${watermark.size}px`,
            opacity: watermark.opacity,
            rotate: rotate ? `${Math.random() * 360}deg` : '0deg',
            zIndex: 0
          }}
        />
      ))}
    </>
  )
}
