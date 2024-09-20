import Icons from '../ui/Icons'

interface InfoItemProps {
  icon: string
  text: string
}

export default function InfoItem({ icon, text }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-1">
      <Icons src={icon} />
      <span>{text}</span>
    </div>
  )
}
