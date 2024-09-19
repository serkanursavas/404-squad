interface IconProps {
  src: string
  className?: string
  onClick?: () => void
}

export default function Icons({ src, className = '', onClick }: IconProps) {
  return (
    <img
      src={src}
      className={`inline-block ${className}`}
      onClick={onClick}
    />
  )
}
