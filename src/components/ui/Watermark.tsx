import { useEffect, useState } from 'react'

interface WatermarkProps {
  watermarkIcon: string
}

const getRandomPosition = () => ({
  top: Math.random() * 100,
  left: Math.random() * 100
})

const getRandomSize = () => Math.random() * 55 + 35

export default function Watermark({ watermarkIcon }: WatermarkProps) {
  const [watermarks, setWatermarks] = useState<{ top: number; left: number; size: number }[]>([])

  useEffect(() => {
    const watermarksCount = 5
    const newWatermarks = Array.from({ length: watermarksCount }).map(() => ({
      ...getRandomPosition(),
      size: getRandomSize()
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
            opacity: 0.1,
            zIndex: 0
          }}
        />
      ))}
    </>
  )
}
