import './Button.css'

type ButtonProps = {
  label: string
  className?: string
  shadowColor?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  animation?: keyof typeof animations
}

const animations = {
  spin: 'animate-spin',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  ping: 'animate-ping'
}

export default function Button({
  label,
  className = '',
  shadowColor = 'grey',
  onClick,
  disabled = false,
  type,
  animation
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`relative px-3 py-2 bg-neutral-light btn text-[12px] ${className}  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ '--shadow-color': shadowColor } as React.CSSProperties}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <p className={`${animation ? animations[animation] : ''}`}>{label}</p>
    </button>
  )
}
