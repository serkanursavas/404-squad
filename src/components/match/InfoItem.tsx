import { GameLocation } from '../../services/matchService'
import Icons from '../ui/Icons'
import GameLocationInfo from './GameLocationInfo'

interface InfoItemProps {
  icon: string
  text?: string
  gameLocation?: GameLocation
}

export default function InfoItem({ icon, text, gameLocation }: InfoItemProps) {
  return (
    <div className="flex items-start space-x-1 text">
      <Icons src={icon} />
      {text && <span>{text}</span>}
      {gameLocation && (
        <GameLocationInfo
          latitude={gameLocation.latitude}
          longitude={gameLocation.longitude}
          location={gameLocation.location}
        />
      )}
    </div>
  )
}
