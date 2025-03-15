import { useNavigate } from 'react-router-dom'
import Icons from '../ui/Icons'

interface PlayerListItemProps {
  icon: string
  playerName: string
  playerSurname: string
  statistic: number
  playerId: number
  statisticLabel?: any
  seeAll?: boolean
}

export default function PlayerListItem({ icon, playerName, statistic, playerId, playerSurname, statisticLabel, seeAll }: PlayerListItemProps) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/profile/${playerId}`)}
      className="mr-4 border-b cursor-pointer border-l-neutral-dark last:border-b-0"
    >
      <div className={`flex justify-between py-2 pl-4 mt-2 ${seeAll ? 'text-sm' : 'text-xs'}`}>
        <span className="flex items-center space-x-2">
          <Icons src={icon} />
          <span className="font-thin">{playerName.split(' ')[0][0] + '.' + playerSurname}</span>
        </span>
        <div className="flex items-center space-x-2">
          {!seeAll && <span className="w-12 text-center">{statisticLabel}</span>}
          <span className="w-12 text-center">{statistic}</span>
        </div>
      </div>
    </div>
  )
}
