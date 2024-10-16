import { useNavigate } from 'react-router-dom'
import Icons from '../ui/Icons'

interface PlayerListItemProps {
  icon: string
  playerName: string
  statistic: string
  playerId: number
}

export default function PlayerListItem({ icon, playerName, statistic, playerId }: PlayerListItemProps) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/profile/${playerId}`)}
      className="mr-4 border-b cursor-pointer border-l-neutral-dark last:border-b-0"
    >
      <div className="flex justify-between px-4 py-2 mt-2 text-sm ">
        <span className="flex items-center space-x-2">
          <Icons src={icon} />
          <span className="font-thin">{playerName}</span>
        </span>
        <span>{statistic}</span>
      </div>
    </div>
  )
}
