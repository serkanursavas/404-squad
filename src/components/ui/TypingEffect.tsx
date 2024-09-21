import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

interface TypingEffectProps {
  text: string[]
  className?: string
}

export default function TypingEffect({ text, className }: TypingEffectProps) {
  const typedRef = useRef(null)

  useEffect(() => {
    const options = {
      strings: text,
      typeSpeed: 80,
      backSpeed: 60,
      backDelay: 2000,
      loop: true
    }

    const typed = new Typed(typedRef.current, options)

    return () => {
      typed.destroy()
    }
  }, [text])

  return (
    <span
      className={className}
      ref={typedRef}
    ></span>
  )
}
