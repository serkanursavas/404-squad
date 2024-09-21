import './Button.css'

type ButtonProps = {
  label: string
  color?: string
  shadowColor?: string
}

export default function Button({
  label,
  color = 'bg-neutral-light',
  shadowColor = 'grey'
}: ButtonProps) {
  return (
    <button
      className={`relative px-3 py-2 ${color} btn text-[12px]`}
      style={{ '--shadow-color': shadowColor } as React.CSSProperties}
    >
      {label}
    </button>
  )
}
